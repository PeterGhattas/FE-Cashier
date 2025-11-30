"use client"

import { StoreProfile } from "@/components/store/store-profile"

export default function MyStorePage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <StoreProfile />
      </div>
    </div>
  )
}