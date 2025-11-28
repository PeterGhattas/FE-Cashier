"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconPlus,
  IconLoader,
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCamera,
  IconCheck,
  IconSettings,
  IconCurrencyDollar,
  IconReceipt,
  IconPackage,
  IconUser,
  IconClock,
  IconCopy,
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
import { Textarea } from "@/components/ui/textarea"
import { CreateStoreDocument, StoresDocument } from "@/graphql/operations/stores"
import { StoreStatus, UserType } from "@/graphql/generated/schema"
import { SelectOwnerDialog } from "./select-owner-dialog"

interface CreateStoreDialogProps {
  onSuccess?: () => void
  children?: React.ReactNode
}

export function CreateStoreDialog({
  onSuccess,
  children,
}: CreateStoreDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedOwner, setSelectedOwner] = React.useState<{
    id: string
    user: UserType
  } | null>(null)

  const defaultBusinessHours = {
    monday: { open: "09:00", close: "18:00", closed: false },
    tuesday: { open: "09:00", close: "18:00", closed: false },
    wednesday: { open: "09:00", close: "18:00", closed: false },
    thursday: { open: "09:00", close: "18:00", closed: false },
    friday: { open: "09:00", close: "18:00", closed: false },
    saturday: { open: "09:00", close: "18:00", closed: false },
    sunday: { open: "09:00", close: "18:00", closed: true },
  }

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    logo: "",
    address: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    registrationNumber: "",
    currency: "USD",
    language: "en",
    timezone: "",
    status: StoreStatus.Active,
    subscriptionPlan: "basic",
    enableTax: false,
    taxName: "VAT",
    taxRate: "0",
    taxId: "",
    enableInventoryTracking: true,
    enableLowStockAlerts: true,
    defaultLowStockThreshold: "10",
    invoicePrefix: "INV",
    nextInvoiceNumber: "1000",
    autoGenerateInvoiceNumbers: true,
  })

  const [businessHours, setBusinessHours] = React.useState(defaultBusinessHours)

  const [createStore, { loading }] = useMutation(CreateStoreDocument, {
    refetchQueries: [{ query: StoresDocument }],
    onCompleted: () => {
      toast.success("Store created", {
        description: `${formData.name} has been successfully created.`,
      })
      setOpen(false)
      resetForm()
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to create store", {
        description: error.message || "An error occurred while creating the store.",
      })
    },
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      logo: "",
      address: "",
      city: "",
      country: "",
      email: "",
      phoneNumber: "",
      registrationNumber: "",
      currency: "USD",
      language: "en",
      timezone: "",
      status: StoreStatus.Active,
      subscriptionPlan: "basic",
      enableTax: false,
      taxName: "VAT",
      taxRate: "0",
      taxId: "",
      enableInventoryTracking: true,
      enableLowStockAlerts: true,
      defaultLowStockThreshold: "10",
      invoicePrefix: "INV",
      nextInvoiceNumber: "1000",
      autoGenerateInvoiceNumbers: true,
    })
    setBusinessHours(defaultBusinessHours)
    setSelectedOwner(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedOwner) {
      toast.error("Owner required", {
        description: "Please select a store owner before creating the store.",
      })
      return
    }

    try {
      await createStore({
        variables: {
          createStoreInput: {
            name: formData.name,
            description: formData.description || undefined,
            logo: formData.logo || undefined,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            email: formData.email || undefined,
            phoneNumber: formData.phoneNumber,
            registrationNumber: formData.registrationNumber || undefined,
            currency: formData.currency,
            language: formData.language,
            timezone: formData.timezone || undefined,
            status: formData.status,
            subscriptionPlan: formData.subscriptionPlan,
            enableTax: formData.enableTax,
            taxName: formData.taxName,
            taxRate: parseFloat(formData.taxRate),
            taxId: formData.taxId || undefined,
            enableInventoryTracking: formData.enableInventoryTracking,
            enableLowStockAlerts: formData.enableLowStockAlerts,
            defaultLowStockThreshold: parseFloat(formData.defaultLowStockThreshold),
            invoicePrefix: formData.invoicePrefix,
            autoGenerateInvoiceNumbers: formData.autoGenerateInvoiceNumbers,
            businessHours,
            ownerId: selectedOwner.id,
          },
        },
      })
    } catch (error) {
      console.error("Error creating store:", error)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSelectOwner = (userId: string, user: UserType) => {
    setSelectedOwner({ id: userId, user })
  }

  const handleBusinessHoursChange = (
    day: string,
    field: "open" | "close" | "closed",
    value: string | boolean
  ) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const copyBusinessHours = (sourceDay: string) => {
    const hours = businessHours[sourceDay as keyof typeof businessHours]
    const updatedHours = { ...businessHours }
    Object.keys(updatedHours).forEach((day) => {
      if (day !== sourceDay) {
        updatedHours[day as keyof typeof updatedHours] = { ...hours }
      }
    })
    setBusinessHours(updatedHours)
    toast.success("Hours copied", {
      description: `Copied ${sourceDay}'s hours to all other days`,
    })
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
            <IconPlus className="mr-2 size-4" />
            Add Store
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <IconPlus className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">Create New Store</DialogTitle>
              <DialogDescription>
                Add a new store to the system with all required details
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <ScrollArea className="max-h-[calc(90vh-200px)] px-6">
            <div className="space-y-6 pb-6">
              {/* Store Owner Selection */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <IconUser className="size-5 text-muted-foreground" />
                    <h3 className="font-semibold text-base">Store Owner</h3>
                    <span className="text-destructive">*</span>
                  </div>
                  {selectedOwner ? (
                    <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                      {selectedOwner.user.avatar ? (
                        <img
                          src={selectedOwner.user.avatar}
                          alt={selectedOwner.user.fullName}
                          className="size-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-lg font-medium">
                          {selectedOwner.user.fullName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{selectedOwner.user.fullName}</p>
                        <p className="text-muted-foreground text-xs">
                          @{selectedOwner.user.username} • {selectedOwner.user.email}
                        </p>
                      </div>
                      <SelectOwnerDialog
                        selectedOwnerId={selectedOwner.id}
                        onSelectOwner={handleSelectOwner}
                      >
                        <Button variant="outline" size="sm" type="button">
                          Change
                        </Button>
                      </SelectOwnerDialog>
                    </div>
                  ) : (
                    <SelectOwnerDialog onSelectOwner={handleSelectOwner}>
                      <Button variant="outline" className="w-full" type="button">
                        <IconUser className="mr-2 size-4" />
                        Select Store Owner
                      </Button>
                    </SelectOwnerDialog>
                  )}
                  <p className="text-muted-foreground text-xs">
                    The user who will manage and own this store
                  </p>
                </div>
              </div>

              {/* Logo Section */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    {formData.logo ? (
                      <img
                        src={formData.logo}
                        alt="Store logo"
                        className="size-24 rounded-lg border-4 border-background object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex size-24 items-center justify-center rounded-lg border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg">
                        <IconBuilding className="size-12 text-primary" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <IconCamera className="size-4" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">Store Logo</h3>
                      <p className="text-muted-foreground text-sm">Optional logo URL</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-sm font-medium">
                        Logo URL
                      </Label>
                      <Input
                        id="logo"
                        value={formData.logo}
                        onChange={(e) => handleInputChange("logo", e.target.value)}
                        placeholder="https://example.com/logo.jpg"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconBuilding className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Basic Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Store Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      placeholder="My Store"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registrationNumber" className="text-sm font-medium">
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={(e) =>
                        handleInputChange("registrationNumber", e.target.value)
                      }
                      placeholder="REG-123456"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Store description..."
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Location */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconMapPin className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Location</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <IconMapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        placeholder="New York"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium">
                      Country <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      required
                      placeholder="United States"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    placeholder="123 Main St"
                    className="h-10"
                  />
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
                      Email Address
                    </Label>
                    <div className="relative">
                      <IconMail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="store@example.com"
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
              </div>

              <Separator />

              {/* Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconSettings className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Settings</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-sm font-medium">
                      Currency <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleInputChange("currency", value)}
                    >
                      <SelectTrigger id="currency" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="EGP">EGP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium">
                      Language <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => handleInputChange("language", value)}
                    >
                      <SelectTrigger id="language" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">Arabic</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-sm font-medium">
                      Timezone
                    </Label>
                    <Input
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => handleInputChange("timezone", e.target.value)}
                      placeholder="UTC"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Store Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger id="status" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={StoreStatus.Active}>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Active
                          </Badge>
                        </SelectItem>
                        <SelectItem value={StoreStatus.Suspended}>
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                            Suspended
                          </Badge>
                        </SelectItem>
                        <SelectItem value={StoreStatus.Inactive}>
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-500">
                            Inactive
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subscriptionPlan" className="text-sm font-medium">
                      Subscription Plan
                    </Label>
                    <Input
                      id="subscriptionPlan"
                      value={formData.subscriptionPlan}
                      onChange={(e) =>
                        handleInputChange("subscriptionPlan", e.target.value)
                      }
                      placeholder="basic"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tax Configuration */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconCurrencyDollar className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Tax Configuration</h3>
                </div>
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="enableTax" className="text-base font-semibold cursor-pointer">
                      Enable Tax
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Apply tax to sales and invoices
                    </p>
                  </div>
                  <Switch
                    id="enableTax"
                    checked={formData.enableTax}
                    onCheckedChange={(checked) =>
                      handleInputChange("enableTax", checked)
                    }
                  />
                </div>
                {formData.enableTax && (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxName" className="text-sm font-medium">
                        Tax Name
                      </Label>
                      <Input
                        id="taxName"
                        value={formData.taxName}
                        onChange={(e) => handleInputChange("taxName", e.target.value)}
                        placeholder="VAT"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxRate" className="text-sm font-medium">
                        Tax Rate (%)
                      </Label>
                      <Input
                        id="taxRate"
                        type="number"
                        step="0.01"
                        value={formData.taxRate}
                        onChange={(e) => handleInputChange("taxRate", e.target.value)}
                        placeholder="15"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId" className="text-sm font-medium">
                        Tax ID
                      </Label>
                      <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => handleInputChange("taxId", e.target.value)}
                        placeholder="TAX-123456"
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Inventory Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconPackage className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Inventory Settings</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1">
                      <Label htmlFor="enableInventoryTracking" className="text-base font-semibold cursor-pointer">
                        Enable Inventory Tracking
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Track stock levels for products
                      </p>
                    </div>
                    <Switch
                      id="enableInventoryTracking"
                      checked={formData.enableInventoryTracking}
                      onCheckedChange={(checked) =>
                        handleInputChange("enableInventoryTracking", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1">
                      <Label htmlFor="enableLowStockAlerts" className="text-base font-semibold cursor-pointer">
                        Enable Low Stock Alerts
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Get notified when stock is low
                      </p>
                    </div>
                    <Switch
                      id="enableLowStockAlerts"
                      checked={formData.enableLowStockAlerts}
                      onCheckedChange={(checked) =>
                        handleInputChange("enableLowStockAlerts", checked)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultLowStockThreshold" className="text-sm font-medium">
                      Default Low Stock Threshold
                    </Label>
                    <Input
                      id="defaultLowStockThreshold"
                      type="number"
                      value={formData.defaultLowStockThreshold}
                      onChange={(e) =>
                        handleInputChange("defaultLowStockThreshold", e.target.value)
                      }
                      placeholder="10"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Invoice Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconReceipt className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Invoice Settings</h3>
                </div>
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="autoGenerateInvoiceNumbers" className="text-base font-semibold cursor-pointer">
                      Auto-Generate Invoice Numbers
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Automatically assign invoice numbers
                    </p>
                  </div>
                  <Switch
                    id="autoGenerateInvoiceNumbers"
                    checked={formData.autoGenerateInvoiceNumbers}
                    onCheckedChange={(checked) =>
                      handleInputChange("autoGenerateInvoiceNumbers", checked)
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix" className="text-sm font-medium">
                      Invoice Prefix
                    </Label>
                    <Input
                      id="invoicePrefix"
                      value={formData.invoicePrefix}
                      onChange={(e) =>
                        handleInputChange("invoicePrefix", e.target.value)
                      }
                      placeholder="INV"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextInvoiceNumber" className="text-sm font-medium">
                      Starting Invoice Number
                    </Label>
                    <Input
                      id="nextInvoiceNumber"
                      type="number"
                      value={formData.nextInvoiceNumber}
                      onChange={(e) =>
                        handleInputChange("nextInvoiceNumber", e.target.value)
                      }
                      placeholder="1000"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Business Hours */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconClock className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Business Hours</h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(businessHours).map(([day, hours]) => (
                    <div
                      key={day}
                      className="rounded-lg border bg-muted/30 p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium capitalize min-w-[90px]">{day}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <Switch
                              id={`${day}-closed`}
                              checked={hours.closed}
                              onCheckedChange={(checked) =>
                                handleBusinessHoursChange(day, "closed", checked)
                              }
                            />
                            <Label
                              htmlFor={`${day}-closed`}
                              className="text-xs cursor-pointer"
                            >
                              Closed
                            </Label>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyBusinessHours(day)}
                            title={`Copy ${day}'s hours to all days`}
                          >
                            <IconCopy className="size-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor={`${day}-open`} className="text-xs">
                            Open Time
                          </Label>
                          <Input
                            id={`${day}-open`}
                            type="time"
                            value={hours.open}
                            onChange={(e) =>
                              handleBusinessHoursChange(day, "open", e.target.value)
                            }
                            disabled={hours.closed}
                            className="h-9"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`${day}-close`} className="text-xs">
                            Close Time
                          </Label>
                          <Input
                            id={`${day}-close`}
                            type="time"
                            value={hours.close}
                            onChange={(e) =>
                              handleBusinessHoursChange(day, "close", e.target.value)
                            }
                            disabled={hours.closed}
                            className="h-9"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>

          <Separator />

          <DialogFooter className="px-6 py-4">
            <div className="flex w-full items-center justify-between gap-3">
              <p className="text-muted-foreground text-sm">
                All required fields must be filled
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
                  disabled={loading || !selectedOwner}
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
                      Create Store
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