"use client"

import * as React from "react"
import { useMutation } from "@apollo/client"
import {
  IconAlertTriangle,
  IconLoader,
  IconTrash,
  IconPackage,
  IconBarcode,
  IconCurrencyDollar,
} from "@tabler/icons-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DeleteProductDocument } from "@/graphql/operations/products/deleteProduct.generated"
import { ProductsDocument } from "@/graphql/operations/products/products.generated"
import { ProductType } from "@/graphql/generated/schema"
import { Separator } from "@/components/ui/separator"

interface RemoveProductDialogProps {
  product: ProductType
  onSuccess?: () => void
  children?: React.ReactNode
}

export function RemoveProductDialog({
  product,
  onSuccess,
  children,
}: RemoveProductDialogProps) {
  const [open, setOpen] = React.useState(false)

  const [deleteProduct, { loading }] = useMutation(DeleteProductDocument, {
    refetchQueries: [{ query: ProductsDocument }],
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
        variables: { id: product._id },
      })
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {children || (
          <Button variant="destructive" size="sm">
            <IconTrash className="mr-2 size-4" />
            Delete Product
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <IconAlertTriangle className="size-6 text-destructive" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-2xl">
                Delete Product
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                product and remove all associated data.
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-start gap-4">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-16 rounded-lg border-2 border-background object-cover shadow-sm"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-lg border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 shadow-sm">
                  <IconPackage className="size-8 text-primary" />
                </div>
              )}
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  {product.description && (
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <IconBarcode className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      SKU: {product.sku}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCurrencyDollar className="size-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex gap-3">
              <IconAlertTriangle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-destructive">
                  Warning: This action is irreversible
                </p>
                <p className="text-muted-foreground text-xs">
                  Deleting this product will remove:
                </p>
                <ul className="text-muted-foreground ml-4 list-disc space-y-0.5 text-xs">
                  <li>All product information and details</li>
                  <li>Inventory records and stock levels</li>
                  <li>Sales history for this product</li>
                  <li>Product images and attachments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? (
              <>
                <IconLoader className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <IconTrash className="mr-2 size-4" />
                Delete Product
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}