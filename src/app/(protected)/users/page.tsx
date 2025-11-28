import type { Metadata } from "next"

import { UserSectionCards } from "@/components/users/user-section-cards"
import { UserChartInteractive } from "@/components/users/user-chart-interactive"
import { UsersDataTable } from "@/components/users/users-data-table"

export const metadata: Metadata = {
  title: "Users",
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <UserSectionCards />
          <div className="px-4 lg:px-6">
            <UserChartInteractive />
          </div>
          <UsersDataTable />
        </div>
      </div>
    </div>
  )
}
