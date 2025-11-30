"use client"

import * as React from "react"
import { useLazyQuery } from "@apollo/client"
import { IconSearch, IconBarcode, IconX } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchProductByCodeDocument } from "@/graphql/operations/products/searchProductByCode.generated"
import { ProductType } from "@/graphql/generated/schema"
import { toast } from "sonner"

interface ProductSearchProps {
  storeId: string
  onProductSelect: (product: ProductType) => void
}

export function ProductSearch({ storeId, onProductSelect }: ProductSearchProps) {
  const [searchCode, setSearchCode] = React.useState("")
  const [searchProduct, { loading }] = useLazyQuery(SearchProductByCodeDocument)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSearch = async (code: string) => {
    if (!code.trim()) {
      toast.error("Please enter a product code or SKU")
      return
    }

    try {
      const { data } = await searchProduct({
        variables: { code: code.trim(), storeId },
      })

      if (data?.searchProductByCode) {
        onProductSelect(data.searchProductByCode as ProductType)
        setSearchCode("")
        inputRef.current?.focus()
      } else {
        toast.error("Product not found")
      }
    } catch (error) {
      toast.error("Failed to search product")
      console.error(error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(searchCode)
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <IconBarcode className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Scan barcode or enter SKU..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchCode && (
            <button
              onClick={() => {
                setSearchCode("")
                inputRef.current?.focus()
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <IconX className="size-4" />
            </button>
          )}
        </div>
        <Button
          onClick={() => handleSearch(searchCode)}
          disabled={loading || !searchCode.trim()}
          size="icon"
        >
          <IconSearch className="size-4" />
        </Button>
      </div>
      {loading && (
        <div className="mt-2 text-sm text-muted-foreground">
          Searching...
        </div>
      )}
    </Card>
  )
}