"use client"

import * as React from "react"
import {
  Package,
  Utensils,
  Shirt,
  Laptop,
  Home,
  Heart,
  Book,
  Gamepad2,
  Watch,
  Baby,
  Bike,
  Flower2,
  Pill,
  Palette,
  Music,
  Grid3x3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useMyProductsQuery } from "@/graphql/operations/products/myProducts.generated"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

// Category icons mapping
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  food: Utensils,
  clothing: Shirt,
  electronics: Laptop,
  home: Home,
  health: Heart,
  books: Book,
  toys: Gamepad2,
  accessories: Watch,
  baby: Baby,
  sports: Bike,
  garden: Flower2,
  pharmacy: Pill,
  beauty: Palette,
  music: Music,
}

// Get icon for category (case-insensitive partial match)
function getCategoryIcon(category: string) {
  const lowerCategory = category.toLowerCase()

  for (const [key, Icon] of Object.entries(CATEGORY_ICONS)) {
    if (lowerCategory.includes(key)) {
      return Icon
    }
  }

  return Package // Default icon
}

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const { data, loading } = useMyProductsQuery()

  // Extract unique categories and count products
  const categories = React.useMemo(() => {
    if (!data?.myProducts) return []

    const categoryMap = new Map<string, number>()

    data.myProducts.forEach((product) => {
      const category = product.category || "Uncategorized"
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
    })

    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [data?.myProducts])

  const totalProducts = data?.myProducts?.length || 0

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Grid3x3 className="h-4 w-4" />
          Categories
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 px-2 pb-3">
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="space-y-0.5 pr-2">
            {/* All Products */}
            <CategoryButton
              icon={Package}
              label="All Products"
              count={totalProducts}
              isSelected={selectedCategory === null}
              onClick={() => onCategorySelect(null)}
            />

            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-muted rounded-lg animate-pulse" />
              ))
            ) : (
              categories.map((category) => {
                const Icon = getCategoryIcon(category.name)
                return (
                  <CategoryButton
                    key={category.name}
                    icon={Icon}
                    label={category.name}
                    count={category.count}
                    isSelected={selectedCategory === category.name}
                    onClick={() => onCategorySelect(category.name)}
                  />
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

interface CategoryButtonProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  count: number
  isSelected: boolean
  onClick: () => void
}

function CategoryButton({ icon: Icon, label, count, isSelected, onClick }: CategoryButtonProps) {
  return (
    <Button
      variant={isSelected ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start gap-2 h-auto py-2 px-2 font-normal",
        isSelected && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-medium"
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
          isSelected
            ? "bg-primary/20 text-primary"
            : "bg-muted text-muted-foreground group-hover:bg-muted/80"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="flex-1 text-left min-w-0">
        <p className="text-xs line-clamp-1">{label}</p>
      </div>

      <Badge
        variant="secondary"
        className={cn(
          "ml-auto flex-shrink-0 text-xs h-5 px-1.5",
          isSelected && "bg-primary/20 text-primary border-primary/30"
        )}
      >
        {count}
      </Badge>
    </Button>
  )
}
