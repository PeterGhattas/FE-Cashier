"use client"

import { IconTrendingUp, IconUser, IconUsers, IconShield } from "@tabler/icons-react"
import { useQuery } from "@apollo/client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { UsersDocument } from "@/graphql/operations/users/users.generated"
import { UserRole } from "@/graphql/generated/schema"

export function UserSectionCards() {
  const { data, loading } = useQuery(UsersDocument)

  const users = data?.users || []
  const totalUsers = users.length
  const activeUsers = users.filter(user => user.isActive).length
  const adminUsers = users.filter(user => user.role === UserRole.Admin).length
  const storeOwners = users.filter(user => user.role === UserRole.StoreOwner).length
  const salesReps = users.filter(user => user.role === UserRole.SalesRep).length

  const activePercentage = totalUsers > 0
    ? ((activeUsers / totalUsers) * 100).toFixed(1)
    : "0"

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : totalUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-4" />
              All Roles
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            System-wide user count <IconUser className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total registered users in the system
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : activeUsers}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              {activePercentage}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Currently active accounts <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Users with active status enabled
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Store Owners</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : storeOwners}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconShield className="size-4" />
              Owners
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Store owner accounts <IconUser className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Users managing their own stores
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Sales Representatives</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? "..." : salesReps}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconUsers className="size-4" />
              Sales Reps
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Sales team members <IconUser className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Active sales representatives
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
