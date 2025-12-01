"use client"

import * as React from "react"
import { Search, Barcode, Package, DollarSign } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { useMyProductsQuery } from "@/graphql/operations/products/myProducts.generated"
import { ProductType } from "@/graphql/generated/schema"
import { getFileUrl } from "@/lib/file-utils"
import { cn } from "@/lib/utils"

interface ProductSearchProps {
  onProductSelect: (product: ProductType) => void
  selectedCategory?: string | null
}

export function ProductSearch({ onProductSelect, selectedCategory }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const { data, loading } = useMyProductsQuery()

  const products = React.useMemo(() => {
    if (!data?.myProducts) return []

    let filtered = data.myProducts

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter((product) => {
        const productCategory = product.category || "Uncategorized"
        return productCategory === selectedCategory
      })
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter((product) => {
        return (
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term) ||
          product.barcode?.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term)
        )
      })
    }

    return filtered
  }, [data?.myProducts, searchTerm, selectedCategory])

  const handleProductClick = (product: ProductType) => {
    onProductSelect(product)
    setSearchTerm("")
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, SKU, or barcode..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 h-10 text-sm"
          autoFocus
        />
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 pb-4">
          {loading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-2 space-y-1.5">
                  <Skeleton className="h-24 w-full rounded-lg" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-2 w-1/2" />
                </CardContent>
              </Card>
            ))
          ) : products.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mb-3 opacity-50" />
              <p className="text-base font-medium">No products found</p>
              <p className="text-xs">Try adjusting your search</p>
            </div>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => handleProductClick(product)}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

interface ProductCardProps {
  product: ProductType
  onClick: () => void
}

function ProductCard({ product, onClick }: ProductCardProps) {
  const imageUrl = product.image ? getFileUrl(product.image) : null
  const isLowStock = product.quantity <= product.minStockLevel
  const isOutOfStock = product.quantity === 0

  return (
    <Card
      className={cn(
        "overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
        isOutOfStock && "opacity-50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground/30" />
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-[10px] font-semibold h-5 px-2">
                Out of Stock
              </Badge>
            </div>
          )}

          {!isOutOfStock && isLowStock && (
            <Badge
              variant="secondary"
              className="absolute top-1.5 right-1.5 bg-amber-500/90 text-white border-0 text-[10px] h-5 px-2"
            >
              Low Stock
            </Badge>
          )}
        </div>

        <div className="p-2 space-y-1.5">
          <div>
            <h3 className="font-semibold text-xs line-clamp-1 leading-tight">{product.name}</h3>
            <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
              {product.category || "Uncategorized"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5 text-primary">
              <DollarSign className="h-3 w-3" />
              <span className="font-bold text-sm">{product.price.toFixed(2)}</span>
            </div>

            <div className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
              <Barcode className="h-2.5 w-2.5" />
              <span className="line-clamp-1">{product.sku}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Stock:</span>
            <span className={cn(
              "font-medium",
              isOutOfStock && "text-destructive",
              isLowStock && !isOutOfStock && "text-amber-600",
              !isLowStock && "text-green-600"
            )}>
              {product.quantity} {product.unit}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}