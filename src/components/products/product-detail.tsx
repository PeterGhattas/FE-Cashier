"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconLoader,
  IconPackage,
  IconArrowLeft,
  IconEdit,
  IconBarcode,
  IconCurrencyDollar,
  IconBox,
  IconAlertCircle,
  IconCircleCheckFilled,
  IconCircleX,
  IconTrendingUp,
  IconCalendar,
  IconTrash,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useProductQuery } from "@/graphql/operations/products/product.generated"
import { ProductStatus, ProductUnit } from "@/graphql/generated/schema"
import { UpdateProductDialog } from "./update-product-dialog"
import { DeleteProductDialog } from "./delete-product-dialog"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter()
  const { data, loading, error } = useProductQuery({
    variables: { id: productId },
  })

  const statusColors = {
    [ProductStatus.Active]: "bg-green-500/10 text-green-500 border-green-500/20",
    [ProductStatus.Inactive]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    [ProductStatus.OutOfStock]: "bg-red-500/10 text-red-500 border-red-500/20",
    [ProductStatus.Discontinued]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  }

  const statusIcons = {
    [ProductStatus.Active]: IconCircleCheckFilled,
    [ProductStatus.Inactive]: IconCircleX,
    [ProductStatus.OutOfStock]: IconAlertCircle,
    [ProductStatus.Discontinued]: IconCircleX,
  }

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconLoader className="size-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    )
  }

  if (error || !data?.product) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconPackage className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Product Not Found</h3>
            <p className="text-muted-foreground text-sm">
              {error?.message || "The product you're looking for doesn't exist."}
            </p>
          </div>
          <Button onClick={() => router.push("/my-products")}>
            <IconArrowLeft className="mr-2 size-4" />
            Back to Products
          </Button>
        </div>
      </div>
    )
  }

  const product = data.product
  const StatusIcon = statusIcons[product.status as ProductStatus]
  const margin = product.price - product.cost
  const marginPercentage = product.price > 0 ? (margin / product.price) * 100 : 0

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/my-products")}
          >
            <IconArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Product Details</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <UpdateProductDialog product={product}>
            <Button>
              <IconEdit className="mr-2 size-4" />
              Edit Product
            </Button>
          </UpdateProductDialog>
          <DeleteProductDialog
            product={product}
            onSuccess={() => router.push("/my-products")}
          >
            <Button variant="destructive">
              <IconTrash className="mr-2 size-4" />
              Delete
            </Button>
          </DeleteProductDialog>
        </div>
      </div>

      <div className="grid gap-6 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Overview Card */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Product Overview</CardTitle>
            <CardDescription>General information about this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {product.image?.secureUrl ? (
                <img
                  src={product.image.secureUrl}
                  alt={product.name}
                  className="size-32 rounded-lg object-cover"
                />
              ) : (
                <div className="flex size-32 items-center justify-center rounded-lg bg-muted">
                  <IconPackage className="size-16 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{product.name}</h2>
                  <Badge
                    variant="outline"
                    className={statusColors[product.status as ProductStatus]}
                  >
                    <StatusIcon className="mr-1 size-3" />
                    {product.status.replace(/_/g, " ")}
                  </Badge>
                </div>
                {product.description && (
                  <p className="text-muted-foreground">{product.description}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">SKU</p>
                    <code className="text-sm font-medium">{product.sku}</code>
                  </div>
                  {product.barcode && (
                    <div>
                      <p className="text-xs text-muted-foreground">Barcode</p>
                      <code className="text-sm font-medium">{product.barcode}</code>
                    </div>
                  )}
                  {product.category && (
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm font-medium">{product.category}</p>
                    </div>
                  )}
                  {product.brand && (
                    <div>
                      <p className="text-xs text-muted-foreground">Brand</p>
                      <p className="text-sm font-medium">{product.brand}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconCurrencyDollar className="size-5 text-primary" />
              <CardTitle>Pricing</CardTitle>
            </div>
            <CardDescription>Price and cost information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Selling Price</p>
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Cost Price</p>
              <p className="text-xl font-semibold">${product.cost.toFixed(2)}</p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Margin</p>
              <p className="text-lg font-medium">
                ${margin.toFixed(2)} ({marginPercentage.toFixed(1)}%)
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Taxable</p>
              <Badge variant={product.taxable ? "default" : "secondary"}>
                {product.taxable ? "Yes" : "No"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconBox className="size-5 text-primary" />
              <CardTitle>Inventory</CardTitle>
            </div>
            <CardDescription>Stock levels and tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Stock</p>
              <p
                className={`text-2xl font-bold ${
                  product.quantity <= product.minStockLevel
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {product.quantity} {product.unit.toLowerCase()}
              </p>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Min Stock Level</p>
                <p className="text-sm font-medium">{product.minStockLevel}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Reorder Point</p>
                <p className="text-sm font-medium">{product.reorderPoint}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted-foreground">Reorder Quantity</p>
                <p className="text-sm font-medium">{product.reorderQuantity}</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Track Inventory</p>
                <Badge variant={product.trackInventory ? "default" : "secondary"}>
                  {product.trackInventory ? "Yes" : "No"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Allow Backorder</p>
                <Badge variant={product.allowBackorder ? "default" : "secondary"}>
                  {product.allowBackorder ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sales Performance Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IconTrendingUp className="size-5 text-primary" />
              <CardTitle>Sales Performance</CardTitle>
            </div>
            <CardDescription>Revenue and sales statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-green-500">
                ${product.revenue.toFixed(2)}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground">Total Units Sold</p>
              <p className="text-xl font-semibold">{product.totalSold}</p>
            </div>
            <Separator />
            {product.lastSoldAt && (
              <div className="flex items-center gap-2">
                <IconCalendar className="size-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Last Sold</p>
                  <p className="text-sm font-medium">
                    {new Date(product.lastSoldAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Information Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Other product details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.supplier && (
                <div>
                  <p className="text-sm text-muted-foreground">Supplier</p>
                  <p className="text-sm font-medium">{product.supplier}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Unit of Measurement</p>
                <p className="text-sm font-medium">{product.unit}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm font-medium">
                  {new Date(product.createdAt).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="text-sm font-medium">
                  {new Date(product.updatedAt).toLocaleString()}
                </p>
              </div>
              {product.tags.length > 0 && (
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
