"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  CreditCard,
  Smartphone,
  Building2,
  Receipt,
  DollarSign,
  Loader2,
} from "lucide-react"
import { PaymentMethod } from "@/graphql/generated/schema"
import { cn } from "@/lib/utils"

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  total: number
  onConfirm: (data: PaymentData) => Promise<void>
  invoiceNumber: string
}

export interface PaymentData {
  paymentMethod: PaymentMethod
  amountPaid: number
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  notes?: string
}

const PAYMENT_METHODS = [
  { value: PaymentMethod.Cash, label: "Cash", icon: Banknote, color: "text-green-600" },
  { value: PaymentMethod.Card, label: "Card", icon: CreditCard, color: "text-blue-600" },
  { value: PaymentMethod.Mobile, label: "Mobile", icon: Smartphone, color: "text-purple-600" },
  { value: PaymentMethod.BankTransfer, label: "Bank Transfer", icon: Building2, color: "text-orange-600" },
  { value: PaymentMethod.Credit, label: "Credit", icon: Receipt, color: "text-red-600" },
]

export function PaymentDialog({
  open,
  onOpenChange,
  total,
  onConfirm,
  invoiceNumber,
}: PaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.Cash)
  const [amountPaid, setAmountPaid] = React.useState(total.toString())
  const [customerName, setCustomerName] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")
  const [customerEmail, setCustomerEmail] = React.useState("")
  const [notes, setNotes] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)

  const amountPaidNum = parseFloat(amountPaid) || 0
  const change = amountPaidNum - total

  React.useEffect(() => {
    if (open) {
      setAmountPaid(total.toFixed(2))
    }
  }, [open, total])

  const handleConfirm = async () => {
    if (amountPaidNum < total) return

    setIsProcessing(true)
    try {
      await onConfirm({
        paymentMethod,
        amountPaid: amountPaidNum,
        customerName: customerName || undefined,
        customerPhone: customerPhone || undefined,
        customerEmail: customerEmail || undefined,
        notes: notes || undefined,
      })

      // Reset form
      setPaymentMethod(PaymentMethod.Cash)
      setAmountPaid(total.toString())
      setCustomerName("")
      setCustomerPhone("")
      setCustomerEmail("")
      setNotes("")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleQuickAmount = (amount: number) => {
    setAmountPaid(amount.toFixed(2))
  }

  const quickAmounts = [10, 20, 50, 100, total]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Receipt className="h-6 w-6 text-primary" />
            Complete Payment
          </DialogTitle>
          <DialogDescription>
            Process payment for invoice #{invoiceNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Payment Method</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((method) => {
                const Icon = method.icon
                const isSelected = paymentMethod === method.value

                return (
                  <Button
                    key={method.value}
                    variant={isSelected ? "default" : "outline"}
                    className={cn(
                      "h-auto py-3 flex-col gap-2",
                      isSelected && "ring-2 ring-primary"
                    )}
                    onClick={() => setPaymentMethod(method.value)}
                    type="button"
                  >
                    <Icon className={cn("h-5 w-5", !isSelected && method.color)} />
                    <span className="text-sm font-medium">{method.label}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Amount Section */}
          <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Amount:</span>
                <span className="text-2xl font-bold flex items-center text-primary">
                  <DollarSign className="h-5 w-5" />
                  {total.toFixed(2)}
                </span>
              </div>

              <div>
                <Label htmlFor="amountPaid" className="text-sm font-medium">
                  Amount Paid
                </Label>
                <Input
                  id="amountPaid"
                  type="number"
                  step="0.01"
                  min={total}
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  className="mt-1.5 h-12 text-lg font-semibold"
                  placeholder="0.00"
                />
              </div>

              {paymentMethod === PaymentMethod.Cash && (
                <>
                  <div className="flex gap-2 flex-wrap">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant="secondary"
                        size="sm"
                        onClick={() => handleQuickAmount(amount)}
                        type="button"
                      >
                        ${amount.toFixed(2)}
                      </Button>
                    ))}
                  </div>

                  {change > 0 && (
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Change:</span>
                      <Badge variant="secondary" className="text-lg px-3 py-1.5">
                        ${change.toFixed(2)}
                      </Badge>
                    </div>
                  )}
                </>
              )}

              {amountPaidNum < total && (
                <p className="text-sm text-destructive">
                  Amount paid must be at least ${total.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Customer Information (Optional)
            </Label>
            <div className="grid gap-3">
              <div>
                <Label htmlFor="customerName" className="text-sm">
                  Name
                </Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                  className="mt-1.5"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="customerPhone" className="text-sm">
                    Phone
                  </Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="customerEmail" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter email"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes..."
                  className="mt-1.5 resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={amountPaidNum < total || isProcessing}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Receipt className="mr-2 h-4 w-4" />
                Complete Sale
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
