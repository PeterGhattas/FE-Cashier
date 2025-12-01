"use client"

import * as React from "react"
import { format } from "date-fns"
import {
  Receipt,
  Eye,
  Calendar,
  DollarSign,
  User,
  CreditCard,
  FileText,
  ChevronDown,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetMySalesQuery } from "@/graphql/operations/sales/getMySales.generated"
import { PaymentMethod, SaleStatus } from "@/graphql/generated/schema"
import { cn } from "@/lib/utils"

interface SalesTableProps {
  onViewDetails?: (saleId: string) => void
}

export function SalesTable({ onViewDetails }: SalesTableProps) {
  const [statusFilter, setStatusFilter] = React.useState<SaleStatus | "ALL">("ALL")
  const [paymentFilter, setPaymentFilter] = React.useState<PaymentMethod | "ALL">("ALL")

  const { data, loading, refetch } = useGetMySalesQuery()

  const sales = React.useMemo(() => {
    if (!data?.getMySales) return []

    let filtered = [...data.getMySales]

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((sale) => sale.status === statusFilter)
    }

    // Filter by payment method
    if (paymentFilter !== "ALL") {
      filtered = filtered.filter((sale) => sale.paymentMethod === paymentFilter)
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }, [data?.getMySales, statusFilter, paymentFilter])

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0)
  const totalProfit = sales.reduce((sum, sale) => sum + sale.profit, 0)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Sales History
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as SaleStatus | "ALL")}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value={SaleStatus.Completed}>Completed</SelectItem>
                <SelectItem value={SaleStatus.Pending}>Pending</SelectItem>
                <SelectItem value={SaleStatus.Cancelled}>Cancelled</SelectItem>
                <SelectItem value={SaleStatus.Refunded}>Refunded</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={paymentFilter}
              onValueChange={(value) => setPaymentFilter(value as PaymentMethod | "ALL")}
            >
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue placeholder="Payment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Payments</SelectItem>
                <SelectItem value={PaymentMethod.Cash}>Cash</SelectItem>
                <SelectItem value={PaymentMethod.Card}>Card</SelectItem>
                <SelectItem value={PaymentMethod.Mobile}>Mobile</SelectItem>
                <SelectItem value={PaymentMethod.BankTransfer}>Bank Transfer</SelectItem>
                <SelectItem value={PaymentMethod.Credit}>Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {!loading && sales.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Total Sales</p>
              <p className="text-2xl font-bold">{sales.length}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Profit</p>
              <p className="text-2xl font-bold text-green-600">${totalProfit.toFixed(2)}</p>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : sales.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Receipt className="h-12 w-12 mb-3 opacity-50" />
            <p className="text-base font-medium">No sales found</p>
            <p className="text-xs">Sales will appear here once transactions are completed</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right w-[80px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <SaleRow
                    key={sale._id}
                    sale={sale}
                    onViewDetails={onViewDetails}
                  />
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}

interface SaleRowProps {
  sale: any
  onViewDetails?: (saleId: string) => void
}

function SaleRow({ sale, onViewDetails }: SaleRowProps) {
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
    <TableRow className="hover:bg-muted/50">
      <TableCell className="font-mono text-sm font-medium">
        {sale.invoiceNumber}
      </TableCell>
      <TableCell className="text-sm">
        <div className="flex flex-col">
          <span>{format(new Date(sale.createdAt), "MMM dd, yyyy")}</span>
          <span className="text-xs text-muted-foreground">
            {format(new Date(sale.createdAt), "HH:mm")}
          </span>
        </div>
      </TableCell>
      <TableCell className="text-sm">
        {sale.customerName ? (
          <div className="flex flex-col">
            <span className="font-medium">{sale.customerName}</span>
            {sale.customerPhone && (
              <span className="text-xs text-muted-foreground">{sale.customerPhone}</span>
            )}
          </div>
        ) : (
          <span className="text-muted-foreground italic">Walk-in</span>
        )}
      </TableCell>
      <TableCell className="text-sm">
        <Badge variant="secondary" className="font-normal">
          {sale.items.length} {sale.items.length === 1 ? "item" : "items"}
        </Badge>
      </TableCell>
      <TableCell className="text-sm">
        <div className="flex items-center gap-1.5">
          <span>{paymentIcons[sale.paymentMethod]}</span>
          <span>{sale.paymentMethod.replace(/_/g, " ")}</span>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={cn("text-xs", statusColors[sale.status])}
        >
          {sale.status}
        </Badge>
      </TableCell>
      <TableCell className="text-right font-bold text-sm">
        ${sale.total.toFixed(2)}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails?.(sale._id)}
          className="h-8"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}
