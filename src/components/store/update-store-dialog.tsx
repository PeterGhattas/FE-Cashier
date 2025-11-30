"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconEdit,
  IconLoader,
  IconBuilding,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCurrencyDollar,
  IconWorld,
  IconLanguage,
  IconReceipt,
  IconPackage,
  IconCamera,
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
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { UpdateStoreDocument, MyStoreDocument } from "@/graphql/operations/stores"
import { StoreType } from "@/graphql/generated/schema"

interface UpdateStoreDialogProps {
  store: StoreType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function UpdateStoreDialog({
  store,
  onSuccess,
  children,
}: UpdateStoreDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: store.name,
    description: store.description || "",
    email: store.email || "",
    phoneNumber: store.phoneNumber,
    address: store.address,
    city: store.city,
    country: store.country,
    registrationNumber: store.registrationNumber || "",
    logo: store.logo || "",
    currency: store.currency,
    language: store.language,
    timezone: store.timezone || "",
    taxRate: store.taxRate,
    taxName: store.taxName,
    taxId: store.taxId || "",
    invoicePrefix: store.invoicePrefix,
    defaultLowStockThreshold: store.defaultLowStockThreshold,
    enableTax: store.enableTax,
    enableInventoryTracking: store.enableInventoryTracking,
    enableLowStockAlerts: store.enableLowStockAlerts,
    autoGenerateInvoiceNumbers: store.autoGenerateInvoiceNumbers,
  })

  const [updateStore, { loading }] = useMutation(UpdateStoreDocument, {
    refetchQueries: [{ query: MyStoreDocument }],
    onCompleted: () => {
      toast.success("Store updated", {
        description: `${formData.name} has been successfully updated.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to update store", {
        description: error.message || "An error occurred while updating the store.",
      })
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await updateStore({
        variables: {
          id: store._id,
          updateStoreInput: {
            name: formData.name,
            description: formData.description || null,
            email: formData.email || null,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            registrationNumber: formData.registrationNumber || null,
            logo: formData.logo || null,
            currency: formData.currency,
            language: formData.language,
            timezone: formData.timezone || null,
            taxRate: formData.taxRate,
            taxName: formData.taxName,
            taxId: formData.taxId || null,
            invoicePrefix: formData.invoicePrefix,
            defaultLowStockThreshold: formData.defaultLowStockThreshold,
            enableTax: formData.enableTax,
            enableInventoryTracking: formData.enableInventoryTracking,
            enableLowStockAlerts: formData.enableLowStockAlerts,
            autoGenerateInvoiceNumbers: formData.autoGenerateInvoiceNumbers,
          },
        },
      })
    } catch (error) {
      console.error("Error updating store:", error)
    }
  }

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  React.useEffect(() => {
    if (open) {
      setFormData({
        name: store.name,
        description: store.description || "",
        email: store.email || "",
        phoneNumber: store.phoneNumber,
        address: store.address,
        city: store.city,
        country: store.country,
        registrationNumber: store.registrationNumber || "",
        logo: store.logo || "",
        currency: store.currency,
        language: store.language,
        timezone: store.timezone || "",
        taxRate: store.taxRate,
        taxName: store.taxName,
        taxId: store.taxId || "",
        invoicePrefix: store.invoicePrefix,
        defaultLowStockThreshold: store.defaultLowStockThreshold,
        enableTax: store.enableTax,
        enableInventoryTracking: store.enableInventoryTracking,
        enableLowStockAlerts: store.enableLowStockAlerts,
        autoGenerateInvoiceNumbers: store.autoGenerateInvoiceNumbers,
      })
    }
  }, [open, store])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <IconEdit className="size-4" />
            Edit Store
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <IconEdit className="size-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl">Edit Store Information</DialogTitle>
              <DialogDescription>
                Update information for {store.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <ScrollArea className="max-h-[calc(90vh-250px)] mt-4">
                <div className="pr-4">
                  <TabsContent value="general" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Store Name <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <IconBuilding className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter store name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter store description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="registrationNumber">Registration Number</Label>
                        <Input
                          id="registrationNumber"
                          placeholder="Enter registration number"
                          value={formData.registrationNumber}
                          onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logo">Logo URL</Label>
                        <div className="relative">
                          <IconCamera className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="logo"
                            placeholder="Enter logo URL"
                            value={formData.logo}
                            onChange={(e) => handleInputChange("logo", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="contact" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <IconMail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="store@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <IconPhone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="phoneNumber"
                            placeholder="+1234567890"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Address <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                          <IconMapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                          <Textarea
                            id="address"
                            placeholder="Enter street address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            className="pl-10"
                            rows={2}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">
                            City <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="city"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">
                            Country <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="country"
                            placeholder="Enter country"
                            value={formData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financial" className="space-y-4 mt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currency">
                            Currency <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <IconCurrencyDollar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="currency"
                              placeholder="USD"
                              value={formData.currency}
                              onChange={(e) => handleInputChange("currency", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="taxRate">Tax Rate (%)</Label>
                          <Input
                            id="taxRate"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="0.00"
                            value={formData.taxRate}
                            onChange={(e) => handleInputChange("taxRate", parseFloat(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="taxName">Tax Name</Label>
                          <Input
                            id="taxName"
                            placeholder="VAT, GST, etc."
                            value={formData.taxName}
                            onChange={(e) => handleInputChange("taxName", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="taxId">Tax ID</Label>
                          <Input
                            id="taxId"
                            placeholder="Enter tax ID"
                            value={formData.taxId}
                            onChange={(e) => handleInputChange("taxId", e.target.value)}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                        <div className="relative">
                          <IconReceipt className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id="invoicePrefix"
                            placeholder="INV"
                            value={formData.invoicePrefix}
                            onChange={(e) => handleInputChange("invoicePrefix", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="settings" className="mt-0">
                    <ScrollArea className="h-[calc(90vh-300px)]">
                      <div className="space-y-6 pr-4">
                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <IconWorld className="size-4" />
                            Regional Settings
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="language">Language</Label>
                              <div className="relative">
                                <IconLanguage className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                  id="language"
                                  placeholder="en"
                                  value={formData.language}
                                  onChange={(e) => handleInputChange("language", e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="timezone">Timezone</Label>
                              <Input
                                id="timezone"
                                placeholder="UTC, America/New_York, etc."
                                value={formData.timezone}
                                onChange={(e) => handleInputChange("timezone", e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <IconPackage className="size-4" />
                            Inventory Settings
                          </h4>
                          <div className="space-y-2">
                            <Label htmlFor="defaultLowStockThreshold">
                              Default Low Stock Threshold
                            </Label>
                            <Input
                              id="defaultLowStockThreshold"
                              type="number"
                              min="0"
                              placeholder="10"
                              value={formData.defaultLowStockThreshold}
                              onChange={(e) => handleInputChange("defaultLowStockThreshold", parseFloat(e.target.value))}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h4 className="font-medium">Feature Toggles</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5 flex-1">
                                <Label htmlFor="enableTax" className="cursor-pointer text-sm font-medium">
                                  Enable Tax
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  Apply tax calculations to sales
                                </p>
                              </div>
                              <Switch
                                id="enableTax"
                                checked={formData.enableTax}
                                onCheckedChange={(checked) => handleInputChange("enableTax", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5 flex-1">
                                <Label htmlFor="enableInventoryTracking" className="cursor-pointer text-sm font-medium">
                                  Enable Inventory Tracking
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  Track product stock levels
                                </p>
                              </div>
                              <Switch
                                id="enableInventoryTracking"
                                checked={formData.enableInventoryTracking}
                                onCheckedChange={(checked) => handleInputChange("enableInventoryTracking", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5 flex-1">
                                <Label htmlFor="enableLowStockAlerts" className="cursor-pointer text-sm font-medium">
                                  Enable Low Stock Alerts
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  Receive notifications for low stock
                                </p>
                              </div>
                              <Switch
                                id="enableLowStockAlerts"
                                checked={formData.enableLowStockAlerts}
                                onCheckedChange={(checked) => handleInputChange("enableLowStockAlerts", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between rounded-lg border p-3">
                              <div className="space-y-0.5 flex-1">
                                <Label htmlFor="autoGenerateInvoiceNumbers" className="cursor-pointer text-sm font-medium">
                                  Auto-Generate Invoice Numbers
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  Automatically generate sequential invoice numbers
                                </p>
                              </div>
                              <Switch
                                id="autoGenerateInvoiceNumbers"
                                checked={formData.autoGenerateInvoiceNumbers}
                                onCheckedChange={(checked) => handleInputChange("autoGenerateInvoiceNumbers", checked)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <IconLoader className="mr-2 size-4 animate-spin" />}
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
