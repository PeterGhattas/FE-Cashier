"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconPlus,
  IconLoader,
  IconPackage,
  IconSearch,
  IconEdit,
  IconEye,
  IconCircleCheckFilled,
  IconCircleX,
  IconAlertCircle,
  IconAlertOctagon,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useMyOutOfStockProductsQuery } from "@/graphql/operations/products/myOutOfStockProducts.generated"
import { ProductStatus } from "@/graphql/generated/schema"
import { CreateProductDialog } from "./create-product-dialog"
import { UpdateProductDialog } from "./update-product-dialog"

export function OutOfStockProductsTable() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data, loading, error } = useMyOutOfStockProductsQuery()

  const products = React.useMemo(() => {
    if (!data?.myOutOfStockProducts) return []

    if (!searchQuery) return data.myOutOfStockProducts

    const query = searchQuery.toLowerCase()
    return data.myOutOfStockProducts.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.barcode?.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query)
    )
  }, [data?.myOutOfStockProducts, searchQuery])

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
          <p className="text-muted-foreground">Loading out of stock products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconPackage className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Error Loading Products</h3>
            <p className="text-muted-foreground text-sm">
              {error.message || "An error occurred while loading products."}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="px-4 lg:px-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <IconAlertOctagon className="size-5 text-red-500" />
                  <CardTitle>Out of Stock Products</CardTitle>
                </div>
                <CardDescription>
                  {products.length} product{products.length !== 1 ? "s" : ""} currently out of stock
                </CardDescription>
              </div>
              <div className="relative w-full max-w-sm">
                <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, SKU, or barcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <IconPackage className="size-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No out of stock products</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {searchQuery
                    ? "Try adjusting your search query"
                    : "All products are in stock"}
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Reorder Point</TableHead>
                    <TableHead className="text-right">Reorder Qty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => {
                    const StatusIcon = statusIcons[product.status as ProductStatus]
                    return (
                      <TableRow key={product._id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {product.image?.secureUrl ? (
                              <img
                                src={product.image.secureUrl}
                                alt={product.name}
                                className="size-10 rounded-md object-cover"
                              />
                            ) : (
                              <div className="flex size-10 items-center justify-center rounded-md bg-muted">
                                <IconPackage className="size-5 text-muted-foreground" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.barcode && (
                                <div className="text-xs text-muted-foreground">
                                  {product.barcode}
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-xs">{product.sku}</code>
                        </TableCell>
                        <TableCell>
                          {product.category ? (
                            <Badge variant="outline">{product.category}</Badge>
                          ) : (
                            <span className="text-muted-foreground text-sm">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          ${product.price.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {product.reorderPoint}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="secondary">
                            {product.reorderQuantity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusColors[product.status as ProductStatus]}
                          >
                            <StatusIcon className="mr-1 size-3" />
                            {product.status.replace(/_/g, " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => router.push(`/my-products/${product._id}`)}
                            >
                              <IconEye className="size-4" />
                            </Button>
                            <UpdateProductDialog product={product}>
                              <Button variant="ghost" size="icon">
                                <IconEdit className="size-4" />
                              </Button>
                            </UpdateProductDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
