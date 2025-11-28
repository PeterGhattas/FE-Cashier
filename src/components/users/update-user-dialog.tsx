"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconEdit,
  IconLoader,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconShield,
  IconCamera,
  IconCheck,
  IconX,
} from "@tabler/icons-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { UpdateUserDocument, UsersDocument } from "@/graphql/operations/users"
import { UserType, UserRole } from "@/graphql/generated/schema"

interface UpdateUserDialogProps {
  user: UserType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function UpdateUserDialog({
  user,
  onSuccess,
  children,
}: UpdateUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    address: user.address || "",
    role: user.role,
    isActive: user.isActive,
    avatar: user.avatar || "",
  })

  const [updateUser, { loading }] = useMutation(UpdateUserDocument, {
    refetchQueries: [{ query: UsersDocument }],
    onCompleted: () => {
      toast.success("User updated", {
        description: `${formData.fullName} has been successfully updated.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to update user", {
        description: error.message || "An error occurred while updating the user.",
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateUser({
        variables: {
          id: user._id,
          updateUserInput: {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            address: formData.address || null,
            role: formData.role,
            isActive: formData.isActive,
            avatar: formData.avatar || null,
          },
        },
      })
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Reset form when dialog opens
  React.useEffect(() => {
    if (open) {
      setFormData({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || "",
        role: user.role,
        isActive: user.isActive,
        avatar: user.avatar || "",
      })
    }
  }, [open, user])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <IconEdit className="size-4" />
            Edit User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <IconEdit className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">Edit User Profile</DialogTitle>
              <DialogDescription>
                Update information for {user.fullName} (@{user.username})
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <ScrollArea className="max-h-[calc(90vh-200px)] px-6">
            <div className="space-y-6 pb-6">
              {/* Profile Picture Section */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    {formData.avatar ? (
                      <img
                        src={formData.avatar}
                        alt={formData.fullName}
                        className="size-24 rounded-full border-4 border-background object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex size-24 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-bold text-primary shadow-lg">
                        {formData.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <IconCamera className="size-4" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{formData.fullName}</h3>
                      <p className="text-muted-foreground text-sm">@{formData.username}</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar" className="text-sm font-medium">
                        Profile Picture URL
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="avatar"
                          value={formData.avatar}
                          onChange={(e) => handleInputChange("avatar", e.target.value)}
                          placeholder="https://example.com/avatar.jpg"
                          className="flex-1"
                        />
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Enter a URL to update the profile picture
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconUser className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Personal Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      required
                      placeholder="John Doe"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      required
                      placeholder="johndoe"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconMail className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Contact Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <IconMail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-sm font-medium">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <IconPhone className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        required
                        placeholder="+1234567890"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <div className="relative">
                    <IconMapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="123 Main St, City, Country"
                      className="h-10 pl-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Role & Permissions */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconShield className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Role & Permissions</h3>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-sm font-medium">
                      User Role <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange("role", value)}
                    >
                      <SelectTrigger id="role" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={UserRole.Admin}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                              Admin
                            </Badge>
                            <span className="text-muted-foreground text-xs">Full system access</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={UserRole.StoreOwner}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                              Store Owner
                            </Badge>
                            <span className="text-muted-foreground text-xs">Manage own store</span>
                          </div>
                        </SelectItem>
                        <SelectItem value={UserRole.SalesRep}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                              Sales Rep
                            </Badge>
                            <span className="text-muted-foreground text-xs">Sales operations</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <IconShield className="size-5 text-primary mt-0.5" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">Current Role</p>
                        <p className="text-muted-foreground text-xs">
                          {formData.role === UserRole.Admin && "Administrator with full system privileges"}
                          {formData.role === UserRole.StoreOwner && "Can manage their own store and assigned sales representatives"}
                          {formData.role === UserRole.SalesRep && "Can perform sales operations and manage inventory"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Account Status */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconCheck className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Account Status</h3>
                </div>
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`flex size-10 items-center justify-center rounded-full ${formData.isActive ? "bg-green-500/10" : "bg-gray-500/10"}`}>
                      {formData.isActive ? (
                        <IconCheck className="size-5 text-green-500" />
                      ) : (
                        <IconX className="size-5 text-gray-500" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="isActive" className="text-base font-semibold cursor-pointer">
                        {formData.isActive ? "Account Active" : "Account Disabled"}
                      </Label>
                      <p className="text-muted-foreground text-sm max-w-md">
                        {formData.isActive
                          ? "User can access the system and perform their assigned duties"
                          : "User account is suspended and cannot access the system"}
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleInputChange("isActive", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </ScrollArea>

          <Separator />

          <DialogFooter className="px-6 py-4">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-muted-foreground text-sm">
                Changes will be saved immediately
              </p>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  className="min-w-[100px]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="min-w-[140px]"
                >
                  {loading ? (
                    <>
                      <IconLoader className="mr-2 size-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <IconCheck className="mr-2 size-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}