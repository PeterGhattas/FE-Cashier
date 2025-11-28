"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import {
  IconSearch,
  IconUser,
  IconCheck,
  IconShield,
} from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { UsersDocument } from "@/graphql/operations/users"
import { UserType, UserRole } from "@/graphql/generated/schema"

interface SelectOwnerDialogProps {
  selectedOwnerId?: string
  onSelectOwner: (userId: string, user: UserType) => void
  children?: React.ReactNode
}

export function SelectOwnerDialog({
  selectedOwnerId,
  onSelectOwner,
  children,
}: SelectOwnerDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data, loading } = useQuery(UsersDocument)
  const users = data?.users || []

  // Filter users by search query and role (only StoreOwner and Admin can own stores)
  const filteredUsers = React.useMemo(() => {
    return users
      .filter(
        (user) =>
          user.role === UserRole.StoreOwner || user.role === UserRole.Admin
      )
      .filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [users, searchQuery])

  const selectedUser = users.find((user) => user._id === selectedOwnerId)

  const handleSelectUser = (user: UserType) => {
    onSelectOwner(user._id, user)
    setOpen(false)
    setSearchQuery("")
  }

  const roleColors = {
    [UserRole.Admin]: "bg-red-500/10 text-red-500 border-red-500/20",
    [UserRole.StoreOwner]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    [UserRole.SalesRep]: "bg-green-500/10 text-green-500 border-green-500/20",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" type="button">
            <IconUser className="mr-2 size-4" />
            Select Owner
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Store Owner</DialogTitle>
          <DialogDescription>
            Search and select a user to assign as the store owner. Only users
            with Admin or Store Owner roles can be assigned.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <IconSearch className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, username, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected User Display */}
          {selectedUser && (
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Currently Selected:
              </p>
              <div className="flex items-center gap-3">
                {selectedUser.avatar ? (
                  <img
                    src={selectedUser.avatar}
                    alt={selectedUser.fullName}
                    className="size-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                    {selectedUser.fullName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedUser.fullName}</p>
                    <Badge
                      variant="outline"
                      className={roleColors[selectedUser.role as UserRole]}
                    >
                      {selectedUser.role.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    @{selectedUser.username} • {selectedUser.email}
                  </p>
                </div>
                <IconCheck className="size-5 text-green-500" />
              </div>
            </div>
          )}

          {/* Users List */}
          <ScrollArea className="h-[400px] rounded-lg border">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground text-sm">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {searchQuery
                    ? "No users found matching your search"
                    : "No eligible users found"}
                </p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredUsers.map((user) => {
                  const isSelected = user._id === selectedOwnerId
                  return (
                    <button
                      key={user._id}
                      type="button"
                      onClick={() => handleSelectUser(user)}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                        isSelected ? "bg-muted" : ""
                      }`}
                    >
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className="size-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{user.fullName}</p>
                          <Badge
                            variant="outline"
                            className={`${roleColors[user.role as UserRole]} text-xs`}
                          >
                            <IconShield className="mr-1 size-3" />
                            {user.role.replace(/_/g, " ")}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground truncate text-xs">
                          @{user.username} • {user.email}
                        </p>
                        {user.phoneNumber && (
                          <p className="text-muted-foreground text-xs">
                            {user.phoneNumber}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <IconCheck className="size-5 flex-shrink-0 text-green-500" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}