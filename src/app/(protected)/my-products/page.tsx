"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MyProductsTable,
  LowStockProductsTable,
  OutOfStockProductsTable,
  ProductsByCategoryTable,
  TopSellingProductsTable,
} from "@/components/products"

export default function MyProductsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <Tabs defaultValue="all" className="w-full">
          <div className="px-4 lg:px-6 py-6">
            <TabsList className="grid w-full max-w-3xl grid-cols-5">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="top-selling">Top Selling</TabsTrigger>
              <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
              <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
              <TabsTrigger value="by-category">By Category</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <MyProductsTable />
          </TabsContent>

          <TabsContent value="top-selling" className="mt-0">
            <TopSellingProductsTable />
          </TabsContent>

          <TabsContent value="low-stock" className="mt-0">
            <LowStockProductsTable />
          </TabsContent>

          <TabsContent value="out-of-stock" className="mt-0">
            <OutOfStockProductsTable />
          </TabsContent>

          <TabsContent value="by-category" className="mt-0">
            <ProductsByCategoryTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
