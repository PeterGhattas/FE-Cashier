"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StoresDocument } from "@/graphql/operations/stores/stores.generated"
import { StoreStatus } from "@/graphql/generated/schema"

const chartConfig = {
  stores: {
    label: "Stores",
  },
  total: {
    label: "Total Stores",
    color: "hsl(var(--chart-1))",
  },
  active: {
    label: "Active Stores",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StoreChartInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const { data } = useQuery(StoresDocument)
  const stores = data?.stores || []

  const filteredData = React.useMemo(() => {
    const now = new Date()
    const daysToShow = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90

    // Create date buckets
    const dateBuckets: { [key: string]: { total: number; active: number } } = {}

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      const dateKey = date.toISOString().split("T")[0]
      dateBuckets[dateKey] = { total: 0, active: 0 }
    }

    // Count stores created up to each date
    stores.forEach((store) => {
      const createdDate = new Date(store.createdAt)
      const createdDateKey = createdDate.toISOString().split("T")[0]

      // Add this store to all dates after it was created
      Object.keys(dateBuckets).forEach((dateKey) => {
        if (dateKey >= createdDateKey) {
          dateBuckets[dateKey].total++
          if (store.status === StoreStatus.Active) {
            dateBuckets[dateKey].active++
          }
        }
      })
    })

    return Object.entries(dateBuckets).map(([date, counts]) => ({
      date,
      total: counts.total,
      active: counts.active,
    }))
  }, [stores, timeRange])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Store Growth</CardTitle>
          <CardDescription>
            Showing total and active stores over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-total)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-active)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-active)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="active"
              type="natural"
              fill="url(#fillActive)"
              stroke="var(--color-active)"
              stackId="a"
            />
            <Area
              dataKey="total"
              type="natural"
              fill="url(#fillTotal)"
              stroke="var(--color-total)"
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}