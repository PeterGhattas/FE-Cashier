"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconCalendar,
  IconLoader,
  IconEdit,
  IconCurrencyDollar,
  IconWorld,
  IconLanguage,
  IconReceipt,
  IconPackage,
  IconBell,
  IconCash,
  IconCircleCheckFilled,
  IconCircleX,
  IconShield,
  IconCreditCard,
} from "@tabler/icons-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useMyStoreQuery } from "@/graphql/operations/stores/myStore.generated"
import { StoreStatus } from "@/graphql/generated/schema"
import { UpdateStoreDialog } from "./update-store-dialog"
import Image from "next/image"

export function StoreProfile() {
  const router = useRouter()
  const { data, loading, error } = useMyStoreQuery()

  React.useEffect(() => {
    console.log("StoreProfile Debug:", {
      loading,
      error: error?.message,
      data,
      store: data?.myStore,
    })
  }, [loading, error, data])

  const store = data?.myStore

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconLoader className="size-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading store information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    console.error("Error loading store:", error)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconBuilding className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Error Loading Store</h3>
            <p className="text-muted-foreground text-sm">
              {error.message || "An error occurred while loading the store information."}
            </p>
          </div>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconBuilding className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No Store Found</h3>
            <p className="text-muted-foreground text-sm">
              You don&apos;t have a store assigned to your account.
            </p>
          </div>
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const statusColors = {
    [StoreStatus.Active]: "bg-green-500/10 text-green-500 border-green-500/20",
    [StoreStatus.Inactive]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    [StoreStatus.Suspended]: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-3xl font-bold">My Store</h1>
          <p className="text-muted-foreground">
            View and manage your store information
          </p>
        </div>
        <div className="flex gap-2">
          <UpdateStoreDialog store={store}>
            <Button variant="outline">
              <IconEdit className="mr-2 size-4" />
              Edit Store
            </Button>
          </UpdateStoreDialog>
        </div>
      </div>

      <div className="grid gap-6 px-4 lg:px-6 @4xl/main:grid-cols-3">
        <Card className="@4xl/main:col-span-1">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={128}
                  height={128}
                  className="size-32 rounded-full border-4 border-background object-cover shadow-lg"
                />
              ) : (
                <div className="flex size-32 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 text-5xl font-bold text-primary shadow-lg">
                  {store.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">{store.name}</CardTitle>
            {store.description && (
              <CardDescription className="text-base">
                {store.description}
              </CardDescription>
            )}
            <div className="flex justify-center gap-2 mt-4">
              <Badge
                variant="outline"
                className={statusColors[store.status as StoreStatus]}
              >
                {store.status === StoreStatus.Active ? (
                  <IconCircleCheckFilled className="mr-1 size-3" />
                ) : store.status === StoreStatus.Suspended ? (
                  <IconCircleX className="mr-1 size-3" />
                ) : (
                  <IconCircleX className="mr-1 size-3" />
                )}
                {store.status}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                <IconCreditCard className="mr-1 size-3" />
                {store.subscriptionPlan}
              </Badge>
            </div>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <IconMail className="size-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-muted-foreground text-xs">Email</p>
                  <p className="font-medium truncate">{store.email || "Not set"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <IconPhone className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium">{store.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <IconMapPin className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Address</p>
                  <p className="font-medium">{store.address}, {store.city}, {store.country}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="@4xl/main:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconBuilding className="size-5 text-primary" />
                <CardTitle>Store Information</CardTitle>
              </div>
              <CardDescription>
                Basic store details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Store Name</Label>
                  <Value>{store.name}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Registration Number</Label>
                  <Value>{store.registrationNumber || "Not set"}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Value>{store.email || "Not set"}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Value>{store.phoneNumber}</Value>
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Value>{store.city}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Value>{store.country}</Value>
                </div>
                <div className="space-y-2 @xl/main:col-span-2">
                  <Label>Address</Label>
                  <Value>{store.address}</Value>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconCurrencyDollar className="size-5 text-primary" />
                <CardTitle>Financial Settings</CardTitle>
              </div>
              <CardDescription>
                Currency, tax, and invoice configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Value>{store.currency}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Tax Rate</Label>
                  <Value>{store.taxRate}%</Value>
                </div>
                <div className="space-y-2">
                  <Label>Tax Name</Label>
                  <Value>{store.taxName}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Tax ID</Label>
                  <Value>{store.taxId || "Not set"}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Invoice Prefix</Label>
                  <Value>{store.invoicePrefix}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Next Invoice Number</Label>
                  <Value>{store.nextInvoiceNumber}</Value>
                </div>
                <div className="space-y-2 @xl/main:col-span-2">
                  <Label>Settings</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={store.enableTax ? "default" : "secondary"}>
                      <IconCash className="mr-1 size-3" />
                      Tax {store.enableTax ? "Enabled" : "Disabled"}
                    </Badge>
                    <Badge variant={store.autoGenerateInvoiceNumbers ? "default" : "secondary"}>
                      <IconReceipt className="mr-1 size-3" />
                      Auto Invoice {store.autoGenerateInvoiceNumbers ? "On" : "Off"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconPackage className="size-5 text-primary" />
                <CardTitle>Inventory Settings</CardTitle>
              </div>
              <CardDescription>
                Stock management and alert configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Low Stock Threshold</Label>
                  <Value>{store.defaultLowStockThreshold} units</Value>
                </div>
                <div className="space-y-2">
                  <Label>Inventory Settings</Label>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={store.enableInventoryTracking ? "default" : "secondary"}>
                      <IconPackage className="mr-1 size-3" />
                      Tracking {store.enableInventoryTracking ? "On" : "Off"}
                    </Badge>
                    <Badge variant={store.enableLowStockAlerts ? "default" : "secondary"}>
                      <IconBell className="mr-1 size-3" />
                      Alerts {store.enableLowStockAlerts ? "On" : "Off"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconWorld className="size-5 text-primary" />
                <CardTitle>Regional Settings</CardTitle>
              </div>
              <CardDescription>
                Language and timezone configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <div className="flex items-center gap-2">
                    <IconLanguage className="size-4 text-muted-foreground" />
                    <Value>{store.language}</Value>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <div className="flex items-center gap-2">
                    <IconClock className="size-4 text-muted-foreground" />
                    <Value>{store.timezone || "Not set"}</Value>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconClock className="size-5 text-primary" />
                <CardTitle>Subscription & Timestamps</CardTitle>
              </div>
              <CardDescription>
                Subscription details and account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  <div className="flex items-center gap-2">
                    <IconCreditCard className="size-4 text-muted-foreground" />
                    <Value>{store.subscriptionPlan}</Value>
                  </div>
                </div>
                {store.subscriptionExpiresAt && (
                  <div className="space-y-2">
                    <Label>Subscription Expires</Label>
                    <div className="flex items-center gap-2">
                      <IconCalendar className="size-4 text-muted-foreground" />
                      <Value>
                        {format(new Date(store.subscriptionExpiresAt), "PPP")}
                      </Value>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Store Created</Label>
                  <div className="flex items-center gap-2">
                    <IconCalendar className="size-4 text-muted-foreground" />
                    <Value>
                      {format(new Date(store.createdAt), "PPP 'at' p")}
                    </Value>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <div className="flex items-center gap-2">
                    <IconClock className="size-4 text-muted-foreground" />
                    <Value>
                      {format(new Date(store.updatedAt), "PPP 'at' p")}
                    </Value>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
      {children}
    </p>
  )
}

function Value({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium">{children}</p>
}