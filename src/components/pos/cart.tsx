"use client"

import * as React from "react"
import { IconTrash, IconPlus, IconMinus, IconShoppingCart } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export interface CartItem {
  productId: string
  productName: string
  sku: string
  unitPrice: number
  quantity: number
  discount: number
  unitCost: number
  taxable: boolean
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onUpdateDiscount: (productId: string, discount: number) => void
  onRemoveItem: (productId: string) => void
  taxRate: number
  currency?: string
}

export function Cart({
  items,
  onUpdateQuantity,
  onUpdateDiscount,
  onRemoveItem,
  taxRate,
  currency = "$",
}: CartProps) {
  const calculateItemSubtotal = (item: CartItem) => {
    return item.unitPrice * item.quantity
  }

  const calculateItemDiscount = (item: CartItem) => {
    return item.discount
  }

  const calculateItemTax = (item: CartItem) => {
    if (!item.taxable) return 0
    const subtotal = calculateItemSubtotal(item)
    const afterDiscount = subtotal - item.discount
    return afterDiscount * (taxRate / 100)
  }

  const calculateItemTotal = (item: CartItem) => {
    const subtotal = calculateItemSubtotal(item)
    const tax = calculateItemTax(item)
    return subtotal - item.discount + tax
  }

  const subtotal = items.reduce((sum, item) => sum + calculateItemSubtotal(item), 0)
  const totalDiscount = items.reduce((sum, item) => sum + calculateItemDiscount(item), 0)
  const totalTax = items.reduce((sum, item) => sum + calculateItemTax(item), 0)
  const total = subtotal - totalDiscount + totalTax

  return (
    <Card className="flex h-full flex-col">
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <IconShoppingCart className="size-5" />
          <h2 className="text-lg font-semibold">Cart</h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {items.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
            <IconShoppingCart className="mb-2 size-12 opacity-20" />
            <p>Cart is empty</p>
            <p className="text-sm">Scan a product to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.productId} className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                    <p className="mt-1 text-sm font-medium">
                      {currency}
                      {item.unitPrice.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6 text-destructive hover:text-destructive"
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7"
                      onClick={() =>
                        onUpdateQuantity(item.productId, Math.max(1, item.quantity - 1))
                      }
                    >
                      <IconMinus className="size-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value) || 1
                        onUpdateQuantity(item.productId, Math.max(1, value))
                      }}
                      className="h-7 w-16 text-center"
                      min={1}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-7"
                      onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                    >
                      <IconPlus className="size-3" />
                    </Button>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Discount:</span>
                    <Input
                      type="number"
                      value={item.discount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0
                        onUpdateDiscount(item.productId, Math.max(0, value))
                      }}
                      className="h-7 w-20 text-right"
                      min={0}
                      step={0.01}
                    />
                  </div>
                </div>

                <Separator className="my-2" />

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Item Total:</span>
                  <span className="font-medium">
                    {currency}
                    {calculateItemTotal(item).toFixed(2)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>

      {items.length > 0 && (
        <>
          <Separator />
          <div className="space-y-2 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal:</span>
              <span>
                {currency}
                {subtotal.toFixed(2)}
              </span>
            </div>
            {totalDiscount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Discount:</span>
                <span className="text-destructive">
                  -{currency}
                  {totalDiscount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tax ({taxRate}%):</span>
              <span>
                {currency}
                {totalTax.toFixed(2)}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>
                {currency}
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}