"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconTrash,
  IconLoader,
  IconAlertTriangle,
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
import { useDeleteProductMutation } from "@/graphql/operations/products/deleteProduct.generated"
import { MyProductsDocument } from "@/graphql/operations/products"

interface DeleteProductDialogProps {
  product: {
    _id: string
    name: string
    sku: string
  }
  children?: React.ReactNode
  onSuccess?: () => void
}

export function DeleteProductDialog({
  product,
  children,
  onSuccess,
}: DeleteProductDialogProps) {
  const [open, setOpen] = React.useState(false)

  const [deleteProduct, { loading }] = useDeleteProductMutation({
    refetchQueries: [{ query: MyProductsDocument }],
    onCompleted: () => {
      toast.success("Product deleted", {
        description: `${product.name} has been successfully deleted.`,
      })
      setOpen(false)
      onSuccess?.()
    },
    onError: (error) => {
      toast.error("Failed to delete product", {
        description: error.message || "An error occurred while deleting the product.",
      })
    },
  })

  const handleDelete = async () => {
    try {
      await deleteProduct({
        variables: {
          id: product._id,
        },
      })
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="destructive" size="sm">
            <IconTrash className="mr-2 size-4" />
            Delete Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <IconAlertTriangle className="size-6 text-destructive" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">Delete Product</DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Are you sure you want to delete this product?
            </p>
            <div className="space-y-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                SKU: <code className="text-xs">{product.sku}</code>
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-orange-500/20 bg-orange-500/5 p-3">
            <div className="flex gap-2">
              <IconAlertTriangle className="size-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-orange-600">
                <p className="font-medium mb-1">Warning:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>All product data will be permanently deleted</li>
                  <li>This product will be removed from all sales records</li>
                  <li>Stock movements history will be affected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading && <IconLoader className="mr-2 size-4 animate-spin" />}
            {loading ? "Deleting..." : "Delete Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
