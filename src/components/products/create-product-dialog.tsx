"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconPlus,
  IconLoader,
  IconPackage,
  IconCamera,
  IconCheck,
  IconBarcode,
  IconTag,
  IconCurrencyDollar,
  IconBox,
  IconBuilding,
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
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { CreateProductDocument } from "@/graphql/operations/products/createProduct.generated"
import { ProductsDocument } from "@/graphql/operations/products/products.generated"
import { ProductStatus, ProductUnit, StoreType } from "@/graphql/generated/schema"
import { SelectStoreDialog } from "./select-store-dialog"

interface CreateProductDialogProps {
  onSuccess?: () => void
  children?: React.ReactNode
  storeId?: string
}

export function CreateProductDialog({
  onSuccess,
  children,
  storeId,
}: CreateProductDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedStore, setSelectedStore] = React.useState<{
    id: string
    store: StoreType
  } | null>(null)

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    sku: "",
    barcode: "",
    price: "",
    cost: "",
    quantity: "",
    minStockLevel: "",
    reorderPoint: "",
    reorderQuantity: "",
    category: "",
    brand: "",
    supplier: "",
    unit: ProductUnit.Piece,
    status: ProductStatus.Active,
    image: "",
    images: [] as string[],
    tags: [] as string[],
    taxable: true,
    trackInventory: true,
    allowBackorder: false,
  })

  const [tagInput, setTagInput] = React.useState("")
  const [imageInput, setImageInput] = React.useState("")

  const [createProduct, { loading }] = useMutation(CreateProductDocument, {
    refetchQueries: [{ query: ProductsDocument }],
    onCompleted: () => {
      toast.success("Product created", {
        description: `${formData.name} has been successfully created.`,
      })
      setOpen(false)
      resetForm()
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to create product", {
        description: error.message || "An error occurred while creating the product.",
      })
    },
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      sku: "",
      barcode: "",
      price: "",
      cost: "",
      quantity: "",
      minStockLevel: "",
      reorderPoint: "",
      reorderQuantity: "",
      category: "",
      brand: "",
      supplier: "",
      unit: ProductUnit.Piece,
      status: ProductStatus.Active,
      image: "",
      images: [],
      tags: [],
      taxable: true,
      trackInventory: true,
      allowBackorder: false,
    })
    setTagInput("")
    setImageInput("")
    setSelectedStore(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const productStoreId = storeId || selectedStore?.id

    if (!productStoreId) {
      toast.error("Store required", {
        description: "Please select a store for this product.",
      })
      return
    }

    try {
      await createProduct({
        variables: {
          createProductInput: {
            name: formData.name,
            description: formData.description || undefined,
            sku: formData.sku,
            barcode: formData.barcode || undefined,
            price: parseFloat(formData.price),
            cost: parseFloat(formData.cost),
            quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
            minStockLevel: formData.minStockLevel
              ? parseInt(formData.minStockLevel)
              : undefined,
            reorderPoint: formData.reorderPoint
              ? parseInt(formData.reorderPoint)
              : undefined,
            reorderQuantity: formData.reorderQuantity
              ? parseInt(formData.reorderQuantity)
              : undefined,
            category: formData.category || undefined,
            brand: formData.brand || undefined,
            supplier: formData.supplier || undefined,
            unit: formData.unit,
            status: formData.status,
            image: formData.image || undefined,
            images: formData.images.length > 0 ? formData.images : undefined,
            tags: formData.tags.length > 0 ? formData.tags : undefined,
            taxable: formData.taxable,
            trackInventory: formData.trackInventory,
            allowBackorder: formData.allowBackorder,
            storeId: productStoreId,
          },
        },
      })
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const handleSelectStore = (storeId: string, store: StoreType) => {
    setSelectedStore({ id: storeId, store })
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleAddImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }))
      setImageInput("")
    }
  }

  const handleRemoveImage = (image: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== image),
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
            <IconPlus className="mr-2 size-4" />
            Add Product
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
              <DialogTitle className="text-2xl">Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <form onSubmit={handleSubmit} className="flex flex-col">
          <ScrollArea className="max-h-[calc(90vh-200px)] px-6">
            <div className="space-y-6 pb-6">
              {/* Product Image */}
              <div className="rounded-lg border bg-muted/30 p-6">
                <div className="flex items-start gap-6">
                  <div className="relative">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Product"
                        className="size-24 rounded-lg border-4 border-background object-cover shadow-lg"
                      />
                    ) : (
                      <div className="flex size-24 items-center justify-center rounded-lg border-4 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg">
                        <IconPackage className="size-12 text-primary" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <IconCamera className="size-4" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">Product Image</h3>
                      <p className="text-muted-foreground text-sm">Main product image URL</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image" className="text-sm font-medium">
                        Image URL
                      </Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => handleInputChange("image", e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconPackage className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Basic Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Product Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      placeholder="Product Name"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku" className="text-sm font-medium">
                      SKU <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      required
                      placeholder="SKU-001"
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
                    placeholder="Product description..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="barcode" className="text-sm font-medium">
                      Barcode
                    </Label>
                    <div className="relative">
                      <IconBarcode className="absolute left-3 top-3 size-4 text-muted-foreground" />
                      <Input
                        id="barcode"
                        value={formData.barcode}
                        onChange={(e) => handleInputChange("barcode", e.target.value)}
                        placeholder="1234567890123"
                        className="h-10 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger id="status" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ProductStatus.Active}>Active</SelectItem>
                        <SelectItem value={ProductStatus.Inactive}>Inactive</SelectItem>
                        <SelectItem value={ProductStatus.OutOfStock}>Out of Stock</SelectItem>
                        <SelectItem value={ProductStatus.Discontinued}>Discontinued</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconCurrencyDollar className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Pricing</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-medium">
                      Selling Price <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      required
                      placeholder="0.00"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost" className="text-sm font-medium">
                      Cost Price <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={(e) => handleInputChange("cost", e.target.value)}
                      required
                      placeholder="0.00"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Inventory */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconBox className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Inventory</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity" className="text-sm font-medium">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                      placeholder="0"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit" className="text-sm font-medium">
                      Unit
                    </Label>
                    <Select
                      value={formData.unit}
                      onValueChange={(value) => handleInputChange("unit", value)}
                    >
                      <SelectTrigger id="unit" className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ProductUnit.Piece}>Piece</SelectItem>
                        <SelectItem value={ProductUnit.Box}>Box</SelectItem>
                        <SelectItem value={ProductUnit.Dozen}>Dozen</SelectItem>
                        <SelectItem value={ProductUnit.Pack}>Pack</SelectItem>
                        <SelectItem value={ProductUnit.Kg}>Kg</SelectItem>
                        <SelectItem value={ProductUnit.Gram}>Gram</SelectItem>
                        <SelectItem value={ProductUnit.Liter}>Liter</SelectItem>
                        <SelectItem value={ProductUnit.Meter}>Meter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minStockLevel" className="text-sm font-medium">
                      Min Stock Level
                    </Label>
                    <Input
                      id="minStockLevel"
                      type="number"
                      value={formData.minStockLevel}
                      onChange={(e) =>
                        handleInputChange("minStockLevel", e.target.value)
                      }
                      placeholder="10"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorderPoint" className="text-sm font-medium">
                      Reorder Point
                    </Label>
                    <Input
                      id="reorderPoint"
                      type="number"
                      value={formData.reorderPoint}
                      onChange={(e) =>
                        handleInputChange("reorderPoint", e.target.value)
                      }
                      placeholder="5"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorderQuantity" className="text-sm font-medium">
                      Reorder Quantity
                    </Label>
                    <Input
                      id="reorderQuantity"
                      type="number"
                      value={formData.reorderQuantity}
                      onChange={(e) =>
                        handleInputChange("reorderQuantity", e.target.value)
                      }
                      placeholder="50"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1">
                      <Label htmlFor="trackInventory" className="text-base font-semibold cursor-pointer">
                        Track Inventory
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Monitor stock levels for this product
                      </p>
                    </div>
                    <Switch
                      id="trackInventory"
                      checked={formData.trackInventory}
                      onCheckedChange={(checked) =>
                        handleInputChange("trackInventory", checked)
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                    <div className="space-y-1">
                      <Label htmlFor="allowBackorder" className="text-base font-semibold cursor-pointer">
                        Allow Backorder
                      </Label>
                      <p className="text-muted-foreground text-sm">
                        Allow selling when out of stock
                      </p>
                    </div>
                    <Switch
                      id="allowBackorder"
                      checked={formData.allowBackorder}
                      onCheckedChange={(checked) =>
                        handleInputChange("allowBackorder", checked)
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Classification */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <IconTag className="size-5 text-muted-foreground" />
                  <h3 className="font-semibold text-base">Classification</h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category
                    </Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      placeholder="Electronics"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-sm font-medium">
                      Brand
                    </Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => handleInputChange("brand", e.target.value)}
                      placeholder="Brand Name"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier" className="text-sm font-medium">
                      Supplier
                    </Label>
                    <Input
                      id="supplier"
                      value={formData.supplier}
                      onChange={(e) => handleInputChange("supplier", e.target.value)}
                      placeholder="Supplier Name"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                      placeholder="Add tag"
                      className="h-10"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTag}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-1 text-sm"
                        >
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="space-y-1">
                    <Label htmlFor="taxable" className="text-base font-semibold cursor-pointer">
                      Taxable
                    </Label>
                    <p className="text-muted-foreground text-sm">
                      Apply tax to this product
                    </p>
                  </div>
                  <Switch
                    id="taxable"
                    checked={formData.taxable}
                    onCheckedChange={(checked) =>
                      handleInputChange("taxable", checked)
                    }
                  />
                </div>
              </div>

              {/* Store Selection */}
              {!storeId && (
                <>
                  <Separator />
                  <div className="rounded-lg border bg-muted/30 p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <IconBuilding className="size-5 text-muted-foreground" />
                        <h3 className="font-semibold text-base">Store</h3>
                        <span className="text-destructive">*</span>
                      </div>
                      {selectedStore ? (
                        <div className="flex items-center gap-3 rounded-lg border bg-background p-3">
                          {selectedStore.store.logo ? (
                            <img
                              src={selectedStore.store.logo}
                              alt={selectedStore.store.name}
                              className="size-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-lg font-medium">
                              <IconBuilding className="size-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{selectedStore.store.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {selectedStore.store.city}, {selectedStore.store.country}
                            </p>
                          </div>
                          <SelectStoreDialog
                            selectedStoreId={selectedStore.id}
                            onSelectStore={handleSelectStore}
                          >
                            <Button variant="outline" size="sm" type="button">
                              Change
                            </Button>
                          </SelectStoreDialog>
                        </div>
                      ) : (
                        <SelectStoreDialog onSelectStore={handleSelectStore}>
                          <Button variant="outline" className="w-full" type="button">
                            <IconBuilding className="mr-2 size-4" />
                            Select Store
                          </Button>
                        </SelectStoreDialog>
                      )}
                      <p className="text-muted-foreground text-xs">
                        The store where this product will be added
                      </p>
                    </div>
                  </div>
                </>
              )}
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
                  disabled={loading || (!storeId && !selectedStore)}
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
                      Create Product
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