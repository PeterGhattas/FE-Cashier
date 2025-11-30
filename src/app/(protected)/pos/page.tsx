"use client"

import { POSInterface } from "@/components/pos/pos-interface"

export default function POSPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
          <POSInterface />
        </div>
      </div>
    </div>
  )
}
