"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Receipt,
  User,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  DollarSign,
  Package,
  FileText,
} from "lucide-react"
import { PaymentMethod, SaleStatus } from "@/graphql/generated/schema"
import { cn } from "@/lib/utils"

interface SaleDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sale: any | null
}

export function SaleDetailsDialog({ open, onOpenChange, sale }: SaleDetailsDialogProps) {
  if (!sale) return null

  const statusColors = {
    [SaleStatus.Completed]: "bg-green-500/10 text-green-600 border-green-500/20",
    [SaleStatus.Pending]: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    [SaleStatus.Cancelled]: "bg-red-500/10 text-red-600 border-red-500/20",
    [SaleStatus.Refunded]: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  }

  const paymentIcons = {
    [PaymentMethod.Cash]: "💵",
    [PaymentMethod.Card]: "💳",
    [PaymentMethod.Mobile]: "📱",
    [PaymentMethod.BankTransfer]: "🏦",
    [PaymentMethod.Credit]: "📝",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Receipt className="h-6 w-6 text-primary" />
              <div>
                <DialogTitle className="text-xl">Sale Details</DialogTitle>
                <DialogDescription className="text-sm mt-1">
                  Invoice #{sale.invoiceNumber}
                </DialogDescription>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn("text-sm", statusColors[sale.status])}
            >
              {sale.status}
            </Badge>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="space-y-6 pr-4">
            {/* Sale Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date & Time</p>
                    <p className="text-sm font-medium">
                      {format(new Date(sale.createdAt), "MMMM dd, yyyy")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(sale.createdAt), "HH:mm:ss")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Payment Method</p>
                    <p className="text-sm font-medium flex items-center gap-1.5">
                      <span>{paymentIcons[sale.paymentMethod]}</span>
                      {sale.paymentMethod.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {sale.customerName && (
                  <>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground">Customer Name</p>
                        <p className="text-sm font-medium">{sale.customerName}</p>
                      </div>
                    </div>

                    {sale.customerPhone && (
                      <div className="flex items-start gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Phone</p>
                          <p className="text-sm font-medium">{sale.customerPhone}</p>
                        </div>
                      </div>
                    )}

                    {sale.customerEmail && (
                      <div className="flex items-start gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-xs text-muted-foreground">Email</p>
                          <p className="text-sm font-medium">{sale.customerEmail}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            <Separator />

            {/* Items Table */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold text-sm">Items</h3>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Product</TableHead>
                      <TableHead className="text-center">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sale.items.map((item: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-sm">{item.productName}</p>
                            <p className="text-xs text-muted-foreground">{item.sku}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-center text-sm font-medium">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right text-sm">
                          ${item.unitPrice.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right text-sm font-medium">
                          ${item.total.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">${sale.subtotal.toFixed(2)}</span>
              </div>

              {sale.discount > 0 && (
                <div className="flex justify-between text-sm text-amber-600">
                  <span>Discount:</span>
                  <span className="font-medium">-${sale.discount.toFixed(2)}</span>
                </div>
              )}

              {sale.tax > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="font-medium">${sale.tax.toFixed(2)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-2xl font-bold text-primary">
                  ${sale.total.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Amount Paid</p>
                  <p className="text-lg font-bold">${sale.amountPaid.toFixed(2)}</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">Change</p>
                  <p className="text-lg font-bold">${sale.change.toFixed(2)}</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                <p className="text-xs text-green-700 dark:text-green-400">Profit</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-500">
                  ${sale.profit.toFixed(2)}
                </p>
              </div>
            </div>

            {sale.notes && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-sm">Notes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                    {sale.notes}
                  </p>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
