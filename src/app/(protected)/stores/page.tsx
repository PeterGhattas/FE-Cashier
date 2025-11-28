"use client"

import { StoreSectionCards } from "@/components/stores/store-section-cards"
import { StoreChartInteractive } from "@/components/stores/store-chart-interactive"
import { StoresDataTable } from "@/components/stores/stores-data-table"

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <StoreSectionCards />
          <div className="px-4 lg:px-6">
            <StoreChartInteractive />
          </div>
          <StoresDataTable />
        </div>
      </div>
    </div>
  )
}