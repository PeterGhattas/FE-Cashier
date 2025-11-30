"use client"

import * as React from "react"
import { useQuery } from "@apollo/client"
import {
  IconSearch,
  IconBuilding,
  IconCheck,
  IconMapPin,
  IconCircleCheckFilled,
  IconAlertTriangle,
  IconCircleX,
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
import { StoresDocument } from "@/graphql/operations/stores"
import { StoreType, StoreStatus } from "@/graphql/generated/schema"

interface SelectStoreDialogProps {
  selectedStoreId?: string
  onSelectStore: (storeId: string, store: StoreType) => void
  children?: React.ReactNode
}

export function SelectStoreDialog({
  selectedStoreId,
  onSelectStore,
  children,
}: SelectStoreDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const { data, loading } = useQuery(StoresDocument)
  const stores = data?.stores || []

  // Filter stores by search query and status (only active stores)
  const filteredStores = React.useMemo(() => {
    return stores
      .filter((store) => store.status === StoreStatus.Active)
      .filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (store.description &&
            store.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
  }, [stores, searchQuery])

  const selectedStore = stores.find((store) => store._id === selectedStoreId)

  const handleSelectStore = (store: StoreType) => {
    onSelectStore(store._id, store)
    setOpen(false)
    setSearchQuery("")
  }

  const statusColors = {
    [StoreStatus.Active]: "bg-green-500/10 text-green-500 border-green-500/20",
    [StoreStatus.Suspended]: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    [StoreStatus.Inactive]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  }

  const statusIcons = {
    [StoreStatus.Active]: IconCircleCheckFilled,
    [StoreStatus.Suspended]: IconAlertTriangle,
    [StoreStatus.Inactive]: IconCircleX,
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" type="button">
            <IconBuilding className="mr-2 size-4" />
            Select Store
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Store</DialogTitle>
          <DialogDescription>
            Search and select a store for this product. Only active stores are shown.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <IconSearch className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, city, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Store Display */}
          {selectedStore && (
            <div className="rounded-lg border bg-muted/30 p-3">
              <p className="text-muted-foreground mb-2 text-xs font-medium">
                Currently Selected:
              </p>
              <div className="flex items-center gap-3">
                {selectedStore.logo ? (
                  <img
                    src={selectedStore.logo}
                    alt={selectedStore.name}
                    className="size-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium">
                    <IconBuilding className="size-5" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{selectedStore.name}</p>
                    <Badge
                      variant="outline"
                      className={statusColors[selectedStore.status as StoreStatus]}
                    >
                      {selectedStore.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {selectedStore.city}, {selectedStore.country}
                  </p>
                </div>
                <IconCheck className="size-5 text-green-500" />
              </div>
            </div>
          )}

          {/* Stores List */}
          <ScrollArea className="h-[400px] rounded-lg border">
            {loading ? (
              <div className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground text-sm">Loading stores...</p>
              </div>
            ) : filteredStores.length === 0 ? (
              <div className="flex h-32 items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {searchQuery
                    ? "No stores found matching your search"
                    : "No active stores found"}
                </p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredStores.map((store) => {
                  const isSelected = store._id === selectedStoreId
                  const StatusIcon = statusIcons[store.status]
                  return (
                    <button
                      key={store._id}
                      type="button"
                      onClick={() => handleSelectStore(store)}
                      className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted ${
                        isSelected ? "bg-muted" : ""
                      }`}
                    >
                      {store.logo ? (
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="size-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                          <IconBuilding className="size-6 text-primary" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{store.name}</p>
                          <Badge
                            variant="outline"
                            className={`${statusColors[store.status as StoreStatus]} text-xs`}
                          >
                            <StatusIcon className="mr-1 size-3" />
                            {store.status}
                          </Badge>
                        </div>
                        {store.description && (
                          <p className="text-muted-foreground truncate text-xs">
                            {store.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1 mt-1">
                          <IconMapPin className="size-3 text-muted-foreground" />
                          <p className="text-muted-foreground text-xs">
                            {store.city}, {store.country}
                          </p>
                        </div>
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