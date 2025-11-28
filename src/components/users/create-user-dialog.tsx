"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconUserPlus,
  IconLoader,
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconShield,
  IconCamera,
  IconCheck,
  IconLock,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreateUserDocument, UsersDocument } from "@/graphql/operations/users"
import { UserRole } from "@/graphql/generated/schema"

interface CreateUserDialogProps {
  onSuccess?: () => void
  children?: React.ReactNode
}

export function CreateUserDialog({
  onSuccess,
  children,
}: CreateUserDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: UserRole.SalesRep,
    avatar: "",
  })

  const [createUser, { loading }] = useMutation(CreateUserDocument, {
    refetchQueries: [{ query: UsersDocument }],
    onCompleted: () => {
      toast.success("User created", {
        description: `${formData.fullName} has been successfully created.`,
      })
      setOpen(false)
      resetForm()
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to create user", {
        description: error.message || "An error occurred while creating the user.",
      })
    },
  })

  const resetForm = () => {
    setFormData({
      fullName: "",
      username: "",
      email: "",
      password: "",
      phoneNumber: "",
      address: "",
      role: UserRole.SalesRep,
      avatar: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createUser({
        variables: {
          createUserInput: {
            fullName: formData.fullName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phoneNumber,
            address: formData.address || undefined,
            role: formData.role,
            avatar: formData.avatar || undefined,
          },
        },
      })
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Reset form when dialog closes
  React.useEffect(() => {
    if (!open) {
      resetForm()
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <IconUserPlus className="mr-2 size-4" />
            Add User
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <IconUserPlus className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the system with their details
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
                        alt="Profile preview"
                        className="size-24 rounded-full border-4 border-background object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex size-24 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 text-3xl font-bold text-primary shadow-lg">
                        <IconUser className="size-12" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <IconCamera className="size-4" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">Profile Picture</h3>
                      <p className="text-muted-foreground text-sm">Optional avatar URL</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar" className="text-sm font-medium">
                        Profile Picture URL
                      </Label>
                      <Input
                        id="avatar"
                        value={formData.avatar}
                        onChange={(e) => handleInputChange("avatar", e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="flex-1"
                      />
                      <p className="text-muted-foreground text-xs">
                        Enter a URL for the user's profile picture
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

              {/* Account Security */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconLock className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Account Security</h3>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <IconLock className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      placeholder="Enter a secure password"
                      className="h-10 pl-10"
                      minLength={6}
                    />
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Password must be at least 6 characters long
                  </p>
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
                        <p className="text-sm font-medium">Selected Role</p>
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
            </div>
          </ScrollArea>

          <Separator />

          <DialogFooter className="px-6 py-4">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-muted-foreground text-sm">
                All fields marked with * are required
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
                      Creating...
                    </>
                  ) : (
                    <>
                      <IconCheck className="mr-2 size-4" />
                      Create User
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
