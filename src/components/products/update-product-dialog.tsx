"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconEdit,
  IconLoader,
  IconPackage,
  IconBarcode,
  IconCurrencyDollar,
  IconHash,
  IconPhoto,
  IconUpload,
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
import { Textarea } from "@/components/ui/textarea"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateProductDocument, MyProductsDocument } from "@/graphql/operations/products"
import { ProductStatus, ProductUnit } from "@/graphql/generated/schema"
import { useUploadMultipleFilesMutation } from "@/graphql/operations/files/uploadMultipleFiles.generated"

interface UpdateProductDialogProps {
  product: any
  children?: React.ReactNode
  onSuccess?: () => void
}

export function UpdateProductDialog({
  product,
  children,
  onSuccess,
}: UpdateProductDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null)
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [uploadedImageId, setUploadedImageId] = React.useState<string | null>(null)

  const [formData, setFormData] = React.useState({
    name: product.name,
    sku: product.sku,
    description: product.description || "",
    price: product.price,
    cost: product.cost,
    quantity: product.quantity,
    barcode: product.barcode || "",
    brand: product.brand || "",
    category: product.category || "",
    supplier: product.supplier || "",
    minStockLevel: product.minStockLevel,
    reorderPoint: product.reorderPoint,
    reorderQuantity: product.reorderQuantity,
    unit: product.unit,
    status: product.status,
    trackInventory: product.trackInventory,
    taxable: product.taxable,
    allowBackorder: product.allowBackorder,
  })

  const [uploadFiles, { loading: uploadingImage }] = useUploadMultipleFilesMutation()

  const [updateProduct, { loading }] = useMutation(UpdateProductDocument, {
    refetchQueries: [{ query: MyProductsDocument }],
    onCompleted: () => {
      toast.success("Product updated", {
        description: `${formData.name} has been successfully updated.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to update product", {
        description: error.message || "An error occurred while updating the product.",
      })
    },
  })

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file.",
      })
      return
    }

    setSelectedImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setUploadedImageId(null)
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) return uploadedImageId

    try {
      const { data } = await uploadFiles({
        variables: {
          files: [selectedImage],
          description: `Product image for ${formData.name}`,
        },
      })

      if (data?.uploadMultipleFiles?.[0]?._id) {
        const fileId = data.uploadMultipleFiles[0]._id
        setUploadedImageId(fileId)
        return fileId
      }

      return null
    } catch (error) {
      console.error("Error uploading image:", error)
      toast.error("Failed to upload image", {
        description: "The product will be updated without changing the image.",
      })
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Upload image first if a new one was selected
      const imageId = await uploadImage()

      await updateProduct({
        variables: {
          id: product._id,
          updateProductInput: {
            name: formData.name,
            sku: formData.sku,
            description: formData.description || null,
            price: formData.price,
            cost: formData.cost,
            quantity: formData.quantity,
            barcode: formData.barcode || null,
            brand: formData.brand || null,
            category: formData.category || null,
            supplier: formData.supplier || null,
            minStockLevel: formData.minStockLevel,
            reorderPoint: formData.reorderPoint,
            reorderQuantity: formData.reorderQuantity,
            unit: formData.unit,
            status: formData.status,
            trackInventory: formData.trackInventory,
            taxable: formData.taxable,
            allowBackorder: formData.allowBackorder,
            image: imageId || undefined,
          },
        },
      })
    } catch (error) {
      console.error("Error updating product:", error)
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
        name: product.name,
        sku: product.sku,
        description: product.description || "",
        price: product.price,
        cost: product.cost,
        quantity: product.quantity,
        barcode: product.barcode || "",
        brand: product.brand || "",
        category: product.category || "",
        supplier: product.supplier || "",
        minStockLevel: product.minStockLevel,
        reorderPoint: product.reorderPoint,
        reorderQuantity: product.reorderQuantity,
        unit: product.unit,
        status: product.status,
        trackInventory: product.trackInventory,
        taxable: product.taxable,
        allowBackorder: product.allowBackorder,
      })

      // Reset image state and show existing image if available
      setSelectedImage(null)
      if (product.image?.secureUrl) {
        setImagePreview(product.image.secureUrl)
        setUploadedImageId(product.image._id)
      } else {
        setImagePreview(null)
        setUploadedImageId(null)
      }
    }
  }, [open, product])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <IconEdit className="size-4" />
            Edit Product
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
              <DialogTitle className="text-2xl">Edit Product</DialogTitle>
              <DialogDescription>
                Update information for {product.name}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="px-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="basic" className="mt-0">
                  <ScrollArea className="h-[calc(90vh-300px)]">
                    <div className="space-y-4 pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="name">
                            Product Name <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <IconPackage className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="name"
                              placeholder="Enter product name"
                              value={formData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="image">Product Image</Label>
                          <div className="flex items-center gap-4">
                            {imagePreview ? (
                              <div className="relative">
                                <img
                                  src={imagePreview}
                                  alt="Product preview"
                                  className="size-24 rounded-lg object-cover border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 size-6 rounded-full"
                                  onClick={handleRemoveImage}
                                >
                                  <IconX className="size-3" />
                                </Button>
                              </div>
                            ) : (
                              <div className="flex size-24 items-center justify-center rounded-lg border border-dashed">
                                <IconPhoto className="size-8 text-muted-foreground" />
                              </div>
                            )}
                            <div className="flex-1">
                              <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                className="hidden"
                              />
                              <Label htmlFor="image" className="cursor-pointer">
                                <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground">
                                  <IconUpload className="size-4" />
                                  {selectedImage ? "Change Image" : "Upload Image"}
                                </div>
                              </Label>
                              <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sku">
                            SKU <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <IconHash className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="sku"
                              placeholder="Enter SKU"
                              value={formData.sku}
                              onChange={(e) => handleInputChange("sku", e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="barcode">Barcode</Label>
                          <div className="relative">
                            <IconBarcode className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="barcode"
                              placeholder="Enter barcode"
                              value={formData.barcode}
                              onChange={(e) => handleInputChange("barcode", e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter product description"
                          value={formData.description}
                          onChange={(e) => handleInputChange("description", e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Input
                            id="category"
                            placeholder="e.g., Electronics, Food"
                            value={formData.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="brand">Brand</Label>
                          <Input
                            id="brand"
                            placeholder="Enter brand name"
                            value={formData.brand}
                            onChange={(e) => handleInputChange("brand", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="supplier">Supplier</Label>
                          <Input
                            id="supplier"
                            placeholder="Enter supplier name"
                            value={formData.supplier}
                            onChange={(e) => handleInputChange("supplier", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="unit">Unit</Label>
                          <Select
                            value={formData.unit}
                            onValueChange={(value) => handleInputChange("unit", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={ProductUnit.Piece}>Piece</SelectItem>
                              <SelectItem value={ProductUnit.Box}>Box</SelectItem>
                              <SelectItem value={ProductUnit.Pack}>Pack</SelectItem>
                              <SelectItem value={ProductUnit.Dozen}>Dozen</SelectItem>
                              <SelectItem value={ProductUnit.Kg}>Kilogram</SelectItem>
                              <SelectItem value={ProductUnit.Gram}>Gram</SelectItem>
                              <SelectItem value={ProductUnit.Liter}>Liter</SelectItem>
                              <SelectItem value={ProductUnit.Meter}>Meter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => handleInputChange("status", value)}
                        >
                          <SelectTrigger>
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
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="pricing" className="mt-0">
                  <ScrollArea className="h-[calc(90vh-300px)]">
                    <div className="space-y-4 pr-4">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="price">
                            Selling Price <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <IconCurrencyDollar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={formData.price}
                              onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cost">
                            Cost Price <span className="text-destructive">*</span>
                          </Label>
                          <div className="relative">
                            <IconCurrencyDollar className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              id="cost"
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={formData.cost}
                              onChange={(e) => handleInputChange("cost", parseFloat(e.target.value))}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <Label htmlFor="taxable" className="cursor-pointer text-sm font-medium">
                            Taxable Product
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Apply tax to this product
                          </p>
                        </div>
                        <Switch
                          id="taxable"
                          checked={formData.taxable}
                          onCheckedChange={(checked) => handleInputChange("taxable", checked)}
                        />
                      </div>
                    </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="inventory" className="mt-0">
                  <ScrollArea className="h-[calc(90vh-300px)]">
                    <div className="space-y-4 pr-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">
                          Current Quantity <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="0"
                          placeholder="0"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", parseInt(e.target.value))}
                          required
                        />
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="minStockLevel">Min Stock Level</Label>
                          <Input
                            id="minStockLevel"
                            type="number"
                            min="0"
                            placeholder="10"
                            value={formData.minStockLevel}
                            onChange={(e) => handleInputChange("minStockLevel", parseInt(e.target.value))}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="reorderPoint">Reorder Point</Label>
                          <Input
                            id="reorderPoint"
                            type="number"
                            min="0"
                            placeholder="20"
                            value={formData.reorderPoint}
                            onChange={(e) => handleInputChange("reorderPoint", parseInt(e.target.value))}
                          />
                        </div>

                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="reorderQuantity">Reorder Quantity</Label>
                          <Input
                            id="reorderQuantity"
                            type="number"
                            min="0"
                            placeholder="50"
                            value={formData.reorderQuantity}
                            onChange={(e) => handleInputChange("reorderQuantity", parseInt(e.target.value))}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <Label htmlFor="trackInventory" className="cursor-pointer text-sm font-medium">
                              Track Inventory
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Monitor stock levels for this product
                            </p>
                          </div>
                          <Switch
                            id="trackInventory"
                            checked={formData.trackInventory}
                            onCheckedChange={(checked) => handleInputChange("trackInventory", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <Label htmlFor="allowBackorder" className="cursor-pointer text-sm font-medium">
                              Allow Backorder
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Allow selling when out of stock
                            </p>
                          </div>
                          <Switch
                            id="allowBackorder"
                            checked={formData.allowBackorder}
                            onCheckedChange={(checked) => handleInputChange("allowBackorder", checked)}
                          />
                        </div>
                      </div>
                    </div>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading || uploadingImage}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading || uploadingImage}>
              {(loading || uploadingImage) && <IconLoader className="mr-2 size-4 animate-spin" />}
              {uploadingImage ? "Uploading..." : loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
