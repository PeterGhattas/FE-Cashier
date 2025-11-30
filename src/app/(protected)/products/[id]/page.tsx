"use client"

import { useQuery } from "@apollo/client"
import { useParams, useRouter } from "next/navigation"
import {
  IconPackage,
  IconBarcode,
  IconCurrencyDollar,
  IconBox,
  IconTag,
  IconAlertCircle,
  IconArrowLeft,
  IconEdit,
  IconTrash,
} from "@tabler/icons-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductDocument } from "@/graphql/operations/products/product.generated"
import { ProductStatus } from "@/graphql/generated/schema"
import { UpdateProductDialog } from "@/components/products/update-product-dialog"
import { RemoveProductDialog } from "@/components/products/remove-product-dialog"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data, loading, error } = useQuery(ProductDocument, {
    variables: { id },
    skip: !id,
  })

  const product = data?.product

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-muted-foreground">Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <IconAlertCircle className="size-12 text-muted-foreground" />
        <div className="text-center">
          <h3 className="font-semibold text-lg">Product not found</h3>
          <p className="text-muted-foreground text-sm">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </div>
        <Button onClick={() => router.push("/products")}>
          <IconArrowLeft className="mr-2 size-4" />
          Back to Products
        </Button>
      </div>
    )
  }

  const statusColors = {
    [ProductStatus.Active]: "bg-green-500/10 text-green-500",
    [ProductStatus.Inactive]: "bg-gray-500/10 text-gray-500",
    [ProductStatus.OutOfStock]: "bg-red-500/10 text-red-500",
    [ProductStatus.Discontinued]: "bg-orange-500/10 text-orange-500",
  }

  const isLowStock = product.quantity <= product.minStockLevel && product.quantity > 0
  const isOutOfStock = product.quantity === 0

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/products")}
          >
            <IconArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground text-sm">
              SKU: {product.sku}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UpdateProductDialog product={product}>
            <Button variant="outline">
              <IconEdit className="mr-2 size-4" />
              Edit
            </Button>
          </UpdateProductDialog>
          <RemoveProductDialog
            product={product}
            onSuccess={() => router.push("/products")}
          >
            <Button variant="destructive">
              <IconTrash className="mr-2 size-4" />
              Delete
            </Button>
          </RemoveProductDialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Image and Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconPackage className="size-5" />
                Product Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-32 rounded-lg border object-cover"
                  />
                ) : (
                  <div className="flex size-32 items-center justify-center rounded-lg border bg-muted">
                    <IconPackage className="size-16 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    {product.description && (
                      <p className="text-muted-foreground text-sm mt-1">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="outline"
                      className={statusColors[product.status]}
                    >
                      {product.status.replace("_", " ")}
                    </Badge>
                    {isOutOfStock && (
                      <Badge variant="outline" className="bg-red-500/10 text-red-500">
                        Out of Stock
                      </Badge>
                    )}
                    {isLowStock && (
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                        Low Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">SKU</p>
                  <p className="font-medium">{product.sku}</p>
                </div>
                {product.barcode && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Barcode</p>
                    <p className="font-medium">{product.barcode}</p>
                  </div>
                )}
                {product.category && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Category</p>
                    <p className="font-medium capitalize">{product.category}</p>
                  </div>
                )}
                {product.brand && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Brand</p>
                    <p className="font-medium">{product.brand}</p>
                  </div>
                )}
                {product.supplier && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-sm">Supplier</p>
                    <p className="font-medium">{product.supplier}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Unit</p>
                  <p className="font-medium capitalize">{product.unit}</p>
                </div>
              </div>

              {product.tags.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-sm">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconCurrencyDollar className="size-5" />
                Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Selling Price</p>
                  <p className="font-semibold text-2xl">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Cost Price</p>
                  <p className="font-semibold text-2xl">
                    ${product.cost.toFixed(2)}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Profit Margin</p>
                  <p className="font-medium">
                    ${(product.price - product.cost).toFixed(2)} (
                    {(((product.price - product.cost) / product.cost) * 100).toFixed(1)}%)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Taxable</p>
                  <p className="font-medium">
                    {product.taxable ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBox className="size-5" />
                Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Current Stock</p>
                  <p className="font-semibold text-2xl">{product.quantity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Min Stock Level</p>
                  <p className="font-medium text-xl">{product.minStockLevel}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Reorder Point</p>
                  <p className="font-medium">{product.reorderPoint}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Reorder Quantity</p>
                  <p className="font-medium">{product.reorderQuantity}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Track Inventory</p>
                  <p className="font-medium">
                    {product.trackInventory ? "Yes" : "No"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Allow Backorder</p>
                  <p className="font-medium">
                    {product.allowBackorder ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sales Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTag className="size-5" />
                Sales Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Total Sold</p>
                <p className="font-semibold text-2xl">{product.totalSold}</p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <p className="font-semibold text-xl">
                  ${product.revenue.toFixed(2)}
                </p>
              </div>
              <Separator />
              {product.lastSoldAt && (
                <div className="space-y-1">
                  <p className="text-muted-foreground text-sm">Last Sold</p>
                  <p className="font-medium text-sm">
                    {format(new Date(product.lastSoldAt), "MMM dd, yyyy")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Created At</p>
                <p className="font-medium text-sm">
                  {format(new Date(product.createdAt), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">Updated At</p>
                <p className="font-medium text-sm">
                  {format(new Date(product.updatedAt), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}