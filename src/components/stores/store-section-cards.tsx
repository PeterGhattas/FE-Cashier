"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import {
  IconBuilding,
  IconCircleCheckFilled,
  IconCircleX,
  IconAlertTriangle,
  IconTrendingUp,
} from "@tabler/icons-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StoresDocument } from "@/graphql/operations/stores/stores.generated"
import { StoreStatus } from "@/graphql/generated/schema"

export function StoreSectionCards() {
  const { data, loading } = useQuery(StoresDocument)
  const stores = data?.stores || []

  const totalStores = stores.length
  const activeStores = stores.filter(
    (store) => store.status === StoreStatus.Active
  ).length
  const suspendedStores = stores.filter(
    (store) => store.status === StoreStatus.Suspended
  ).length
  const inactiveStores = stores.filter(
    (store) => store.status === StoreStatus.Inactive
  ).length

  const cards = [
    {
      title: "Total Stores",
      value: loading ? "..." : totalStores,
      description: "Total number of stores",
      icon: IconBuilding,
      trend: null,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Active Stores",
      value: loading ? "..." : activeStores,
      description: "Currently operational stores",
      icon: IconCircleCheckFilled,
      trend: null,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Suspended Stores",
      value: loading ? "..." : suspendedStores,
      description: "Temporarily suspended stores",
      icon: IconAlertTriangle,
      trend: null,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      title: "Inactive Stores",
      value: loading ? "..." : inactiveStores,
      description: "Inactive or closed stores",
      icon: IconCircleX,
      trend: null,
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
    },
  ]

  return (
    <div className="grid gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @4xl/main:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <div className={`${card.bgColor} rounded-full p-2`}>
                <Icon className={`size-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-muted-foreground text-xs">
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
