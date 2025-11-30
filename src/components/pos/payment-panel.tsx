"use client"

import * as React from "react"
import { IconCash, IconCreditCard, IconDeviceMobile, IconBuilding, IconWallet } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PaymentMethod } from "@/graphql/generated/schema"

interface PaymentPanelProps {
  total: number
  onComplete: (paymentMethod: PaymentMethod, amountPaid: number, customerInfo?: CustomerInfo) => void
  currency?: string
}

export interface CustomerInfo {
  name?: string
  email?: string
  phone?: string
}

const paymentMethods = [
  { value: PaymentMethod.Cash, label: "Cash", icon: IconCash },
  { value: PaymentMethod.Card, label: "Card", icon: IconCreditCard },
  { value: PaymentMethod.Mobile, label: "Mobile", icon: IconDeviceMobile },
  { value: PaymentMethod.BankTransfer, label: "Bank", icon: IconBuilding },
  { value: PaymentMethod.Credit, label: "Credit", icon: IconWallet },
]

export function PaymentPanel({ total, onComplete, currency = "$" }: PaymentPanelProps) {
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>(PaymentMethod.Cash)
  const [amountPaid, setAmountPaid] = React.useState<string>(total.toFixed(2))
  const [customerName, setCustomerName] = React.useState("")
  const [customerEmail, setCustomerEmail] = React.useState("")
  const [customerPhone, setCustomerPhone] = React.useState("")

  const amountPaidNumber = parseFloat(amountPaid) || 0
  const change = amountPaidNumber - total

  React.useEffect(() => {
    setAmountPaid(total.toFixed(2))
  }, [total])

  const handleQuickAmount = (amount: number) => {
    setAmountPaid(amount.toFixed(2))
  }

  const handleComplete = () => {
    if (amountPaidNumber < total) {
      return
    }

    const customerInfo: CustomerInfo = {}
    if (customerName) customerInfo.name = customerName
    if (customerEmail) customerInfo.email = customerEmail
    if (customerPhone) customerInfo.phone = customerPhone

    onComplete(paymentMethod, amountPaidNumber, customerInfo)
  }

  const quickAmounts = [
    { label: "Exact", value: total },
    { label: `${currency}20`, value: 20 },
    { label: `${currency}50`, value: 50 },
    { label: `${currency}100`, value: 100 },
  ]

  return (
    <Card className="flex h-full flex-col p-4">
      <h2 className="mb-4 text-lg font-semibold">Payment</h2>

      <div className="space-y-4">
        <div>
          <Label>Payment Method</Label>
          <ToggleGroup
            type="single"
            value={paymentMethod}
            onValueChange={(value) => value && setPaymentMethod(value as PaymentMethod)}
            className="mt-2 grid grid-cols-3 gap-2"
          >
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <ToggleGroupItem
                  key={method.value}
                  value={method.value}
                  className="flex flex-col gap-2 py-4"
                >
                  <Icon className="size-5" />
                  <span className="text-xs">{method.label}</span>
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </div>

        <Separator />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <Label htmlFor="amount-paid">Amount Paid</Label>
            <div className="flex gap-1">
              {quickAmounts.map((quick) => (
                <Button
                  key={quick.label}
                  variant="outline"
                  size="sm"
                  className="h-6 text-xs"
                  onClick={() => handleQuickAmount(quick.value)}
                >
                  {quick.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {currency}
            </span>
            <Input
              id="amount-paid"
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="pl-8 text-lg font-semibold"
              step={0.01}
              min={0}
            />
          </div>
        </div>

        <div className="rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-semibold">
              {currency}
              {total.toFixed(2)}
            </span>
          </div>
          {change >= 0 && (
            <div className="mt-2 flex items-center justify-between">
              <span className="text-muted-foreground">Change:</span>
              <span className="text-lg font-bold text-green-600">
                {currency}
                {change.toFixed(2)}
              </span>
            </div>
          )}
          {change < 0 && (
            <div className="mt-2 text-sm text-destructive">
              Insufficient amount paid
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-sm text-muted-foreground">Customer Information (Optional)</Label>
          <div>
            <Input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleComplete}
          disabled={amountPaidNumber < total || total === 0}
        >
          Complete Sale
        </Button>
      </div>
    </Card>
  )
}
