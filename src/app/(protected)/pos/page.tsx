"use client"

import * as React from "react"
import { toast } from "sonner"
import { ProductSearch, Cart, PaymentDialog, CartItem, PaymentData, CategoryFilter } from "@/components/pos"
import { ProductType } from "@/graphql/generated/schema"
import { useMyStoreQuery } from "@/graphql/operations/stores/myStore.generated"
import { useCreateSaleMutation } from "@/graphql/operations/sales/createSale.generated"
import { useGetNextInvoiceNumberMutation } from "@/graphql/operations/sales/getNextInvoiceNumber.generated"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function POSPage() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = React.useState(false)
  const [invoiceNumber, setInvoiceNumber] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)

  const { data: storeData, loading: storeLoading } = useMyStoreQuery()
  const [createSale] = useCreateSaleMutation()
  const [getNextInvoiceNumber] = useGetNextInvoiceNumberMutation()

  const store = storeData?.myStore

  const handleProductSelect = (product: ProductType) => {
    if (product.quantity === 0) {
      toast.error("Out of Stock", {
        description: `${product.name} is currently out of stock`,
        icon: <AlertCircle className="h-4 w-4" />,
      })
      return
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product._id)

      if (existingItem) {
        if (existingItem.quantity >= product.quantity) {
          toast.warning("Maximum Quantity", {
            description: "Cannot add more than available stock",
            icon: <AlertCircle className="h-4 w-4" />,
          })
          return prev
        }

        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      const newItem: CartItem = {
        productId: product._id,
        name: product.name,
        sku: product.sku,
        price: product.price,
        cost: product.cost,
        quantity: 1,
        maxQuantity: product.quantity,
        taxable: product.taxable,
      }

      toast.success("Added to Cart", {
        description: `${product.name} added to cart`,
        icon: <CheckCircle2 className="h-4 w-4" />,
      })

      return [...prev, newItem]
    })
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
    toast.info("Item Removed", {
      description: "Item removed from cart",
    })
  }

  const handleClearAll = () => {
    setCartItems([])
    toast.info("Cart Cleared", {
      description: "All items removed from cart",
    })
  }

  const handleCheckout = async () => {
    if (!store) {
      toast.error("Error", {
        description: "Store information not available",
        icon: <AlertCircle className="h-4 w-4" />,
      })
      return
    }

    try {
      const { data } = await getNextInvoiceNumber({
        variables: { storeId: store._id },
      })

      if (data?.getNextInvoiceNumber) {
        setInvoiceNumber(data.getNextInvoiceNumber)
        setIsPaymentDialogOpen(true)
      }
    } catch (error) {
      toast.error("Error", {
        description: "Failed to generate invoice number",
        icon: <AlertCircle className="h-4 w-4" />,
      })
    }
  }

  const handlePaymentConfirm = async (paymentData: PaymentData) => {
    if (!store) return

    try {
      const items = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price,
        discount: 0,
      }))

      await createSale({
        variables: {
          input: {
            storeId: store._id,
            items,
            paymentMethod: paymentData.paymentMethod,
            amountPaid: paymentData.amountPaid,
            discount: 0,
            customerName: paymentData.customerName,
            customerPhone: paymentData.customerPhone,
            customerEmail: paymentData.customerEmail,
            notes: paymentData.notes,
          },
        },
      })

      toast.success("Sale Completed!", {
        description: `Invoice #${invoiceNumber} has been created successfully`,
        icon: <CheckCircle2 className="h-4 w-4" />,
        duration: 5000,
      })

      // Reset cart and close dialog
      setCartItems([])
      setIsPaymentDialogOpen(false)
      setInvoiceNumber("")
    } catch (error) {
      toast.error("Sale Failed", {
        description: "Failed to complete the sale. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />,
      })
      throw error
    }
  }

  if (storeLoading) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[180px_1fr_380px]">
          <div className="hidden lg:block">
            <Skeleton className="h-[600px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[600px] w-full" />
          </div>
          <div>
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Store Not Found</h2>
          <p className="text-muted-foreground">
            Unable to load store information. Please try again.
          </p>
        </div>
      </div>
    )
  }

  const taxRate = store.enableTax ? store.taxRate : 0

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          <div className="px-4 lg:px-6 py-4 border-b bg-gradient-to-r from-background to-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Point of Sale</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {store.name} • {store.city}, {store.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Currency</p>
                <p className="text-lg font-semibold">{store.currency}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-6">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-[180px_1fr_380px] h-full">
              {/* Categories */}
              <div className="hidden lg:block">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </div>

              {/* Products */}
              <div>
                <ProductSearch
                  onProductSelect={handleProductSelect}
                  selectedCategory={selectedCategory}
                />
              </div>

              {/* Cart */}
              <div>
                <Cart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onClearAll={handleClearAll}
                  onCheckout={handleCheckout}
                  taxRate={taxRate}
                  discount={0}
                  onDiscountChange={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentDialog
        open={isPaymentDialogOpen}
        onOpenChange={setIsPaymentDialogOpen}
        total={calculateTotal(cartItems, taxRate, 0)}
        onConfirm={handlePaymentConfirm}
        invoiceNumber={invoiceNumber}
      />
    </>
  )
}

function calculateTotal(items: CartItem[], taxRate: number, discount: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxableAmount = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = (taxableAmount * taxRate) / 100
  const discountAmount = (subtotal * discount) / 100
  return subtotal + tax - discountAmount
}
