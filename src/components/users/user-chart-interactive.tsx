"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { useQuery } from "@apollo/client"
import { format, subDays, startOfDay } from "date-fns"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
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
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { UsersDocument } from "@/graphql/operations/users/users.generated"
import { UserRole } from "@/graphql/generated/schema"

const chartConfig = {
  users: {
    label: "Users",
  },
  total: {
    label: "Total Users",
    color: "var(--primary)",
  },
  active: {
    label: "Active Users",
    color: "var(--primary)",
  },
} satisfies ChartConfig

export function UserChartInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")
  const { data, loading } = useQuery(UsersDocument)

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const chartData = React.useMemo(() => {
    if (!data?.users) return []

    const users = data.users
    const now = new Date()
    let days = 90

    if (timeRange === "30d") {
      days = 30
    } else if (timeRange === "7d") {
      days = 7
    }

    const dataPoints = []
    for (let i = days - 1; i >= 0; i--) {
      const date = startOfDay(subDays(now, i))
      const dateStr = format(date, "yyyy-MM-dd")

      const usersCreatedByDate = users.filter((user) => {
        const userDate = startOfDay(new Date(user.createdAt))
        return userDate <= date
      }).length

      const activeUsersByDate = users.filter((user) => {
        const userDate = startOfDay(new Date(user.createdAt))
        return userDate <= date && user.isActive
      }).length

      dataPoints.push({
        date: dateStr,
        total: usersCreatedByDate,
        active: activeUsersByDate,
      })
    }

    return dataPoints
  }, [data, timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            User registration trends over time
          </span>
          <span className="@[540px]/card:hidden">User trends</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
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
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {loading ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-muted-foreground">Loading chart data...</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-total)"
                    stopOpacity={1.0}
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
                  return format(date, "MMM dd")
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return format(new Date(value), "MMM dd, yyyy")
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
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
