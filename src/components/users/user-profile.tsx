"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation"
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconShield,
  IconCalendar,
  IconClock,
  IconCircleCheckFilled,
  IconCircleX,
  IconArrowLeft,
  IconEdit,
  IconTrash,
  IconLoader,
  IconBuilding,
  IconKey,
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
import { UserDocument } from "@/graphql/operations/users"
import { UserRole } from "@/graphql/generated/schema"
import { UpdateUserDialog } from "./update-user-dialog"
import { RemoveUserDialog } from "./remove-user-dialog"
import Image from "next/image"

interface UserProfileProps {
  userId: string
}

export function UserProfile({ userId }: UserProfileProps) {
  const router = useRouter()
  const { data, loading, error } = useQuery(UserDocument, {
    variables: { id: userId },
    skip: !userId,
  })

  // Debug logging
  React.useEffect(() => {
    console.log("UserProfile Debug:", {
      userId,
      loading,
      error: error?.message,
      data,
      user: data?.user,
    })
  }, [userId, loading, error, data])

  const user = data?.user

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconLoader className="size-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading user profile...</p>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    console.error("Error loading user:", error)
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconUser className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Error Loading User</h3>
            <p className="text-muted-foreground text-sm">
              {error.message || "An error occurred while loading the user profile."}
            </p>
          </div>
          <Button onClick={() => router.push("/users")}>
            <IconArrowLeft className="mr-2 size-4" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  // Show not found state
  if (!user) {
    return (
      <div className="flex h-[calc(100vh-200px)] items-center justify-center">
        <div className="text-center space-y-4">
          <IconUser className="size-12 text-muted-foreground mx-auto" />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">User not found</h3>
            <p className="text-muted-foreground text-sm">
              The user you&apos;re looking for doesn&apos;t exist or has been deleted.
            </p>
          </div>
          <Button onClick={() => router.push("/users")}>
            <IconArrowLeft className="mr-2 size-4" />
            Back to Users
          </Button>
        </div>
      </div>
    )
  }

  const roleColors = {
    [UserRole.Admin]: "bg-red-500/10 text-red-500 border-red-500/20",
    [UserRole.StoreOwner]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    [UserRole.SalesRep]: "bg-green-500/10 text-green-500 border-green-500/20",
  }

  return (
    <div className="flex flex-col gap-6 py-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push("/users")}
          >
            <IconArrowLeft className="size-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-muted-foreground">
              View and manage user information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <UpdateUserDialog user={user}>
            <Button variant="outline">
              <IconEdit className="mr-2 size-4" />
              Edit User
            </Button>
          </UpdateUserDialog>
          <RemoveUserDialog
            user={user}
            onSuccess={() => router.push("/users")}
          >
            <Button variant="destructive">
              <IconTrash className="mr-2 size-4" />
              Delete
            </Button>
          </RemoveUserDialog>
        </div>
      </div>

      <div className="grid gap-6 px-4 lg:px-6 @4xl/main:grid-cols-3">
        {/* Profile Overview Card */}
        <Card className="@4xl/main:col-span-1">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  className="size-32 rounded-full border-4 border-background object-cover shadow-lg"
                />
              ) : (
                <div className="flex size-32 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 text-5xl font-bold text-primary shadow-lg">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <CardTitle className="text-2xl">{user.fullName}</CardTitle>
            <CardDescription className="text-base">
              @{user.username}
            </CardDescription>
            <div className="flex justify-center gap-2 mt-4">
              <Badge
                variant="outline"
                className={roleColors[user.role as UserRole]}
              >
                <IconShield className="mr-1 size-3" />
                {user.role.replace(/_/g, " ")}
              </Badge>
              <Badge
                variant="outline"
                className={
                  user.isActive
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                }
              >
                {user.isActive ? (
                  <>
                    <IconCircleCheckFilled className="mr-1 size-3" />
                    Active
                  </>
                ) : (
                  <>
                    <IconCircleX className="mr-1 size-3" />
                    Inactive
                  </>
                )}
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
                  <p className="font-medium truncate">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <IconPhone className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Phone</p>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
              </div>
              {user.address && (
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <IconMapPin className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-muted-foreground text-xs">Address</p>
                    <p className="font-medium">{user.address}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Section */}
        <div className="@4xl/main:col-span-2 space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconUser className="size-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>
                User account details and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Value>{user.fullName}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Value>@{user.username}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Value>{user.email}</Value>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Value>{user.phoneNumber}</Value>
                </div>
                {user.address && (
                  <div className="space-y-2 @xl/main:col-span-2">
                    <Label>Address</Label>
                    <Value>{user.address}</Value>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Role & Permissions */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconShield className="size-5 text-primary" />
                <CardTitle>Role & Permissions</CardTitle>
              </div>
              <CardDescription>
                User role and access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>User Role</Label>
                  <div>
                    <Badge
                      variant="outline"
                      className={`${roleColors[user.role as UserRole]} text-base px-3 py-1`}
                    >
                      <IconShield className="mr-2 size-4" />
                      {user.role.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {user.role === UserRole.Admin &&
                      "Administrator with full system privileges"}
                    {user.role === UserRole.StoreOwner &&
                      "Can manage their own store and assigned sales representatives"}
                    {user.role === UserRole.SalesRep &&
                      "Can perform sales operations and manage inventory"}
                  </p>
                </div>
                {user.permissions && user.permissions.length > 0 && (
                  <div className="space-y-2">
                    <Label>Permissions</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.permissions.map((permission, index) => (
                        <Badge key={index} variant="secondary">
                          <IconKey className="mr-1 size-3" />
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {user.storeId && (
                  <div className="space-y-2">
                    <Label>Assigned Store</Label>
                    <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3">
                      <IconBuilding className="size-4 text-muted-foreground" />
                      <span className="font-medium">{user.storeId}</span>
                    </div>
                  </div>
                )}
                {user.assignedStores && user.assignedStores.length > 0 && (
                  <div className="space-y-2">
                    <Label>Assigned Stores</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.assignedStores.map((storeId, index) => (
                        <Badge key={index} variant="outline">
                          <IconBuilding className="mr-1 size-3" />
                          {storeId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity & Timestamps */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <IconClock className="size-5 text-primary" />
                <CardTitle>Activity & Timestamps</CardTitle>
              </div>
              <CardDescription>
                User account activity information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 @xl/main:grid-cols-2">
                <div className="space-y-2">
                  <Label>Account Created</Label>
                  <div className="flex items-center gap-2">
                    <IconCalendar className="size-4 text-muted-foreground" />
                    <Value>
                      {format(new Date(user.createdAt), "PPP 'at' p")}
                    </Value>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Updated</Label>
                  <div className="flex items-center gap-2">
                    <IconClock className="size-4 text-muted-foreground" />
                    <Value>
                      {format(new Date(user.updatedAt), "PPP 'at' p")}
                    </Value>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Login</Label>
                  <div className="flex items-center gap-2">
                    <IconUser className="size-4 text-muted-foreground" />
                    <Value>
                      {user.lastLogin
                        ? format(new Date(user.lastLogin), "PPP 'at' p")
                        : "Never logged in"}
                    </Value>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Account Status</Label>
                  <div className="flex items-center gap-2">
                    {user.isActive ? (
                      <IconCircleCheckFilled className="size-4 text-green-500" />
                    ) : (
                      <IconCircleX className="size-4 text-gray-500" />
                    )}
                    <Value>
                      {user.isActive ? "Active" : "Inactive"}
                    </Value>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Device Tokens (if any) */}
          {user.deviceTokens && user.deviceTokens.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <IconShield className="size-5 text-primary" />
                  <CardTitle>Connected Devices</CardTitle>
                </div>
                <CardDescription>
                  Registered device tokens for push notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>{user.deviceTokens.length} device(s) registered</Label>
                  <div className="text-muted-foreground text-sm">
                    This user has {user.deviceTokens.length} device
                    {user.deviceTokens.length !== 1 ? "s" : ""} registered for
                    push notifications.
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
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