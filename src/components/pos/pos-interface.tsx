"use client"

import * as React from "react"
import { useMutation, useQuery } from "@apollo/client"
import { IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import { ProductSearch } from "./product-search"
import { Cart, CartItem } from "./cart"
import { PaymentPanel, CustomerInfo } from "./payment-panel"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductType, PaymentMethod } from "@/graphql/generated/schema"
import { CreateSaleDocument } from "@/graphql/operations/sales/createSale.generated"
import { MyStoreDocument } from "@/graphql/operations/stores/myStore.generated"

export function POSInterface() {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])

  const { data: storeData, loading: storeLoading } = useQuery(MyStoreDocument)
  const [createSale, { loading: creatingSale }] = useMutation(CreateSaleDocument)

  const store = storeData?.myStore

  const handleProductSelect = (product: ProductType) => {
    if (product.quantity === 0 && !product.allowBackorder) {
      toast.error("Product is out of stock")
      return
    }

    setCartItems((items) => {
      const existingItem = items.find((item) => item.productId === product._id)

      if (existingItem) {
        return items.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      const newItem: CartItem = {
        productId: product._id,
        productName: product.name,
        sku: product.sku,
        unitPrice: product.price,
        quantity: 1,
        discount: 0,
        unitCost: product.cost,
        taxable: product.taxable,
      }

      return [...items, newItem]
    })

    toast.success(`${product.name} added to cart`)
  }

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const handleUpdateDiscount = (productId: string, discount: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.productId === productId ? { ...item, discount } : item
      )
    )
  }

  const handleRemoveItem = (productId: string) => {
    setCartItems((items) => items.filter((item) => item.productId !== productId))
  }

  const handleClearCart = () => {
    setCartItems([])
    toast.info("Cart cleared")
  }

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0)
    const taxRate = store?.enableTax ? store.taxRate : 0
    const totalTax = cartItems.reduce((sum, item) => {
      if (!item.taxable) return sum
      const itemSubtotal = item.unitPrice * item.quantity
      const afterDiscount = itemSubtotal - item.discount
      return sum + afterDiscount * (taxRate / 100)
    }, 0)

    return subtotal - totalDiscount + totalTax
  }

  const handleCompleteSale = async (
    paymentMethod: PaymentMethod,
    amountPaid: number,
    customerInfo?: CustomerInfo
  ) => {
    if (!store) {
      toast.error("Store not found")
      return
    }

    try {
      const items = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
      }))

      const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0)

      await createSale({
        variables: {
          input: {
            storeId: store._id,
            items,
            paymentMethod,
            amountPaid,
            discount: totalDiscount,
            customerName: customerInfo?.name,
            customerEmail: customerInfo?.email,
            customerPhone: customerInfo?.phone,
          },
        },
      })

      toast.success("Sale completed successfully!")
      setCartItems([])
    } catch (error) {
      toast.error("Failed to complete sale")
      console.error(error)
    }
  }

  if (storeLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading store information...</p>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-destructive">No store found. Please contact support.</p>
        </Card>
      </div>
    )
  }

  const total = calculateTotal()
  const taxRate = store.enableTax ? store.taxRate : 0

  return (
    <div className="grid h-full gap-4 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{store.name}</h1>
            <p className="text-sm text-muted-foreground">Point of Sale</p>
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-destructive"
            >
              <IconTrash className="mr-2 size-4" />
              Clear Cart
            </Button>
          )}
        </div>

        <ProductSearch storeId={store._id} onProductSelect={handleProductSelect} />

        <div className="h-[calc(100vh-20rem)]">
          <Cart
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onUpdateDiscount={handleUpdateDiscount}
            onRemoveItem={handleRemoveItem}
            taxRate={taxRate}
            currency={store.currency || "$"}
          />
        </div>
      </div>

      <div className="h-[calc(100vh-12rem)]">
        <PaymentPanel
          total={total}
          onComplete={handleCompleteSale}
          currency={store.currency || "$"}
        />
      </div>
    </div>
  )
}
