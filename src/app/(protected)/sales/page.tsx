"use client"

import * as React from "react"
import { SalesTable, SaleDetailsDialog } from "@/components/sales"
import { useGetMySalesQuery } from "@/graphql/operations/sales/getMySales.generated"

export default function SalesPage() {
  const [selectedSaleId, setSelectedSaleId] = React.useState<string | null>(null)
  const { data } = useGetMySalesQuery()

  const selectedSale = React.useMemo(() => {
    if (!selectedSaleId || !data?.getMySales) return null
    return data.getMySales.find((sale) => sale._id === selectedSaleId)
  }, [selectedSaleId, data?.getMySales])

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          <div className="px-4 lg:px-6 py-4 border-b bg-gradient-to-r from-background to-muted/30">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sales</h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and manage all your sales transactions
              </p>
            </div>
          </div>

          <div className="flex-1 p-4 lg:p-6">
            <SalesTable onViewDetails={(id) => setSelectedSaleId(id)} />
          </div>
        </div>
      </div>

      <SaleDetailsDialog
        open={!!selectedSaleId}
        onOpenChange={(open) => !open && setSelectedSaleId(null)}
        sale={selectedSale}
      />
    </>
  )
}