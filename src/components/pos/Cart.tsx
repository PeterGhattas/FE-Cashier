"use client"

import * as React from "react"
import { Minus, Plus, Trash2, ShoppingCart, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface CartItem {
  productId: string
  name: string
  sku: string
  price: number
  cost: number
  quantity: number
  maxQuantity: number
  taxable: boolean
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearAll: () => void
  onCheckout: () => void
  taxRate: number
  discount: number
  onDiscountChange: (discount: number) => void
}

export function Cart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onCheckout,
  taxRate,
  discount,
}: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const taxableAmount = items
    .filter((item) => item.taxable)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = (taxableAmount * taxRate) / 100
  const discountAmount = (subtotal * discount) / 100
  const total = subtotal + tax - discountAmount

  const isEmpty = items.length === 0

  return (
    <Card className="flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5" />
            Cart
            {!isEmpty && (
              <Badge variant="secondary">
                {items.length} {items.length === 1 ? "item" : "items"}
              </Badge>
            )}
          </CardTitle>
          {!isEmpty && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-0 pb-4">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground px-4">
            <ShoppingCart className="h-16 w-16 mb-4 opacity-30" />
            <p className="text-lg font-medium">Cart is empty</p>
            <p className="text-sm">Add products to start a sale</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-28rem)]">
            <div className="space-y-1 px-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.productId}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>

      {!isEmpty && (
        <CardFooter className="flex-col gap-3 pt-4 border-t">
          <div className="w-full space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-amber-600 dark:text-amber-500">
                <span>Discount ({discount}%):</span>
                <span className="font-medium">-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            {taxRate > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Tax ({taxRate}%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="flex items-center text-primary">
                <DollarSign className="h-5 w-5" />
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            size="lg"
          >
            Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

function CartItemRow({ item, onUpdateQuantity, onRemove }: CartItemRowProps) {
  const [inputValue, setInputValue] = React.useState(item.quantity.toString())
  const itemTotal = item.price * item.quantity

  // Sync input value when item quantity changes externally
  React.useEffect(() => {
    setInputValue(item.quantity.toString())
  }, [item.quantity])

  const handleIncrement = () => {
    if (item.quantity < item.maxQuantity) {
      onUpdateQuantity(item.productId, item.quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.productId, item.quantity - 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string while typing
    if (value === "") {
      setInputValue("")
      return
    }
    // Only allow positive integers
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 0) {
      setInputValue(value)
    }
  }

  const handleInputBlur = () => {
    const numValue = parseInt(inputValue, 10)

    if (isNaN(numValue) || numValue < 1) {
      // Reset to minimum quantity
      setInputValue("1")
      onUpdateQuantity(item.productId, 1)
    } else if (numValue > item.maxQuantity) {
      // Cap at max quantity
      setInputValue(item.maxQuantity.toString())
      onUpdateQuantity(item.productId, item.maxQuantity)
    } else {
      // Valid quantity
      setInputValue(numValue.toString())
      onUpdateQuantity(item.productId, numValue)
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur()
    }
  }

  return (
    <div className="group grid grid-cols-[auto_1fr_auto_auto] gap-3 items-center py-3 px-3 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
      {/* Delete Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive opacity-60 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(item.productId)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      {/* Item Details */}
      <div className="min-w-0">
        <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          ${item.price.toFixed(2)} • {item.sku}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-background"
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <Input
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="h-7 w-12 text-center font-semibold text-sm p-0 border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-primary"
        />

        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 hover:bg-background"
          onClick={handleIncrement}
          disabled={item.quantity >= item.maxQuantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Total Cost */}
      <div className="text-right min-w-[4rem]">
        <p className="font-bold text-base">${itemTotal.toFixed(2)}</p>
      </div>
    </div>
  )
}
