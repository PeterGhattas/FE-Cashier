"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import {
  IconBuilding,
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconCalendar,
  IconUser,
  IconSettings,
  IconReceipt,
  IconPackage,
  IconCreditCard,
  IconEdit,
  IconTrash,
  IconCircleCheckFilled,
  IconAlertTriangle,
  IconCircleX,
  IconCurrency,
  IconWorld,
  IconFileInvoice,
  IconChevronLeft,
} from "@tabler/icons-react"
import { format } from "date-fns"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StoreDocument } from "@/graphql/operations/stores/store.generated"
import { UsersDocument } from "@/graphql/operations/users"
import { StoreStatus } from "@/graphql/generated/schema"
import { UpdateStoreDialog } from "./update-store-dialog"
import { RemoveStoreDialog } from "./remove-store-dialog"

interface StoreProfileProps {
  storeId: string
}

export function StoreProfile({ storeId }: StoreProfileProps) {
  const { data, loading, error } = useQuery(StoreDocument, {
    variables: { id: storeId },
  })

  const { data: usersData } = useQuery(UsersDocument)
  const users = usersData?.users || []

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Loading store details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-destructive">Error loading store</div>
          <div className="text-muted-foreground text-sm">{error.message}</div>
        </div>
      </div>
    )
  }

  const store = data?.store

  if (!store) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Store not found</div>
        </div>
      </div>
    )
  }

  const owner = users.find((u) => u._id === store.ownerId)

  const statusColors = {
    [StoreStatus.Active]: "bg-green-500/10 text-green-500",
    [StoreStatus.Suspended]: "bg-yellow-500/10 text-yellow-500",
    [StoreStatus.Inactive]: "bg-gray-500/10 text-gray-500",
  }

  const statusIcons = {
    [StoreStatus.Active]: IconCircleCheckFilled,
    [StoreStatus.Suspended]: IconAlertTriangle,
    [StoreStatus.Inactive]: IconCircleX,
  }

  const StatusIcon = statusIcons[store.status]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/stores">
          <Button variant="outline" size="icon">
            <IconChevronLeft className="size-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Store Details</h1>
          <p className="text-muted-foreground text-sm">
            View and manage store information
          </p>
        </div>
        <div className="flex items-center gap-2">
          <UpdateStoreDialog store={store}>
            <Button variant="outline" size="sm">
              <IconEdit className="mr-2 size-4" />
              Edit
            </Button>
          </UpdateStoreDialog>
          <RemoveStoreDialog store={store}>
            <Button variant="destructive" size="sm">
              <IconTrash className="mr-2 size-4" />
              Delete
            </Button>
          </RemoveStoreDialog>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <Card className="lg:col-span-3">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              {store.logo ? (
                <img
                  src={store.logo}
                  alt={store.name}
                  className="size-24 rounded-lg border-2 border-background object-cover shadow-md"
                />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-lg border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-md">
                  <IconBuilding className="size-12 text-primary" />
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold">{store.name}</h2>
                    <Badge
                      variant="outline"
                      className={statusColors[store.status as StoreStatus]}
                    >
                      <StatusIcon className="mr-1 size-3" />
                      {store.status}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {store.subscriptionPlan}
                    </Badge>
                  </div>
                  {store.description && (
                    <p className="text-muted-foreground mt-1">
                      {store.description}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <IconMapPin className="size-4 text-muted-foreground" />
                    <span>
                      {store.city}, {store.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IconPhone className="size-4 text-muted-foreground" />
                    <span>{store.phoneNumber}</span>
                  </div>
                  {store.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <IconMail className="size-4 text-muted-foreground" />
                      <span>{store.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Owner Information */}
        {owner && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <IconUser className="size-4" />
                Store Owner
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                {owner.avatar ? (
                  <img
                    src={owner.avatar}
                    alt={owner.fullName}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    {owner.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{owner.fullName}</p>
                  <p className="text-muted-foreground text-xs truncate">
                    @{owner.username}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <IconMail className="size-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">
                    {owner.email}
                  </span>
                </div>
                {owner.phoneNumber && (
                  <div className="flex items-center gap-2">
                    <IconPhone className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {owner.phoneNumber}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">
                    {owner.role.replace(/_/g, " ")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconBuilding className="size-4" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs">Store Name</p>
              <p className="font-medium">{store.name}</p>
            </div>
            {store.description && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">Description</p>
                  <p className="text-sm">{store.description}</p>
                </div>
              </>
            )}
            {store.registrationNumber && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Registration Number
                  </p>
                  <p className="text-sm">{store.registrationNumber}</p>
                </div>
              </>
            )}
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Subscription Plan</p>
              <Badge variant="outline" className="mt-1 capitalize">
                {store.subscriptionPlan}
              </Badge>
            </div>
            {store.subscriptionExpiresAt && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Subscription Expires
                  </p>
                  <p className="text-sm">
                    {format(new Date(store.subscriptionExpiresAt), "PPP")}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Location Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconMapPin className="size-4" />
              Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs">Address</p>
              <p className="text-sm">{store.address}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">City</p>
              <p className="text-sm">{store.city}</p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs">Country</p>
              <p className="text-sm">{store.country}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconPhone className="size-4" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-xs">Phone Number</p>
              <p className="text-sm">{store.phoneNumber}</p>
            </div>
            {store.email && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="text-sm">{store.email}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconSettings className="size-4" />
              Store Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconCurrency className="size-4 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">Currency</p>
              </div>
              <p className="text-sm font-medium">{store.currency}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconWorld className="size-4 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">Language</p>
              </div>
              <p className="text-sm font-medium">{store.language}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconClock className="size-4 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">Timezone</p>
              </div>
              <p className="text-sm font-medium">{store.timezone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Tax Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconReceipt className="size-4" />
              Tax Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">Tax Enabled</p>
              <Badge variant={store.enableTax ? "default" : "secondary"}>
                {store.enableTax ? "Yes" : "No"}
              </Badge>
            </div>
            {store.enableTax && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">Tax Name</p>
                  <p className="text-sm">{store.taxName || "N/A"}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">Tax Rate</p>
                  <p className="text-sm">{store.taxRate || 0}%</p>
                </div>
                {store.taxId && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-muted-foreground text-xs">Tax ID</p>
                      <p className="text-sm">{store.taxId}</p>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Inventory Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconPackage className="size-4" />
              Inventory Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Inventory Tracking
              </p>
              <Badge
                variant={store.enableInventoryTracking ? "default" : "secondary"}
              >
                {store.enableInventoryTracking ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Low Stock Alerts
              </p>
              <Badge
                variant={store.enableLowStockAlerts ? "default" : "secondary"}
              >
                {store.enableLowStockAlerts ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            {store.enableLowStockAlerts && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Default Low Stock Threshold
                  </p>
                  <p className="text-sm">
                    {store.defaultLowStockThreshold || 10}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconFileInvoice className="size-4" />
              Invoice Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-xs">
                Auto Generate Invoice Numbers
              </p>
              <Badge
                variant={
                  store.autoGenerateInvoiceNumbers ? "default" : "secondary"
                }
              >
                {store.autoGenerateInvoiceNumbers ? "Enabled" : "Disabled"}
              </Badge>
            </div>
            {store.autoGenerateInvoiceNumbers && (
              <>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Invoice Prefix
                  </p>
                  <p className="text-sm">{store.invoicePrefix || "INV"}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Next Invoice Number
                  </p>
                  <p className="text-sm">{store.nextInvoiceNumber || 1}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Activity & Timestamps */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <IconCalendar className="size-4" />
              Activity & Timestamps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-muted-foreground text-xs">Created At</p>
                <p className="text-sm">
                  {format(new Date(store.createdAt), "PPP 'at' p")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Last Updated</p>
                <p className="text-sm">
                  {format(new Date(store.updatedAt), "PPP 'at' p")}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Store ID</p>
                <p className="font-mono text-xs">{store._id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        {store.businessHours && Object.keys(store.businessHours).length > 0 && (
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <IconClock className="size-4" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(store.businessHours).map(([day, hours]) => {
                  // Handle both string and object formats
                  let displayHours = ""
                  if (typeof hours === "string") {
                    displayHours = hours
                  } else if (typeof hours === "object" && hours !== null) {
                    const hoursObj = hours as any
                    if (hoursObj.closed) {
                      displayHours = "Closed"
                    } else if (hoursObj.open && hoursObj.close) {
                      displayHours = `${hoursObj.open} - ${hoursObj.close}`
                    } else {
                      displayHours = JSON.stringify(hours)
                    }
                  }

                  return (
                    <div key={day} className="flex justify-between">
                      <span className="text-muted-foreground capitalize text-sm">
                        {day}:
                      </span>
                      <span className="text-sm font-medium">{displayHours}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}