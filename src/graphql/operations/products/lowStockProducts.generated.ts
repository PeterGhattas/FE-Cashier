import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LowStockProductsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type LowStockProductsQuery = { __typename?: 'Query', lowStockProducts: Array<{ __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, image?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any }> };


export const LowStockProductsDocument = gql`
    query LowStockProducts($storeId: String!) {
  lowStockProducts(storeId: $storeId) {
    _id
    allowBackorder
    barcode
    brand
    category
    cost
    createdAt
    description
    image
    images
    lastSoldAt
    metadata
    minStockLevel
    name
    price
    quantity
    reorderPoint
    reorderQuantity
    revenue
    sku
    status
    storeId
    supplier
    tags
    taxable
    totalSold
    trackInventory
    unit
    updatedAt
  }
}
    `;
export function useLowStockProductsQuery(baseOptions: Apollo.QueryHookOptions<LowStockProductsQuery, LowStockProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LowStockProductsQuery, LowStockProductsQueryVariables>(LowStockProductsDocument, options);
      }
export function useLowStockProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LowStockProductsQuery, LowStockProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LowStockProductsQuery, LowStockProductsQueryVariables>(LowStockProductsDocument, options);
        }
export type LowStockProductsQueryHookResult = ReturnType<typeof useLowStockProductsQuery>;
export type LowStockProductsLazyQueryHookResult = ReturnType<typeof useLowStockProductsLazyQuery>;
export type LowStockProductsQueryResult = Apollo.QueryResult<LowStockProductsQuery, LowStockProductsQueryVariables>;