"use client"

import * as React from "react"
import { ProductDetail } from "@/components/products/product-detail"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = React.use(params)

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col">
        <ProductDetail productId={id} />
      </div>
    </div>
  )
}
