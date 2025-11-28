import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OutOfStockProductsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type OutOfStockProductsQuery = { __typename?: 'Query', outOfStockProducts: Array<{ __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, image?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any }> };


export const OutOfStockProductsDocument = gql`
    query OutOfStockProducts($storeId: String!) {
  outOfStockProducts(storeId: $storeId) {
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
export function useOutOfStockProductsQuery(baseOptions: Apollo.QueryHookOptions<OutOfStockProductsQuery, OutOfStockProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OutOfStockProductsQuery, OutOfStockProductsQueryVariables>(OutOfStockProductsDocument, options);
      }
export function useOutOfStockProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OutOfStockProductsQuery, OutOfStockProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OutOfStockProductsQuery, OutOfStockProductsQueryVariables>(OutOfStockProductsDocument, options);
        }
export type OutOfStockProductsQueryHookResult = ReturnType<typeof useOutOfStockProductsQuery>;
export type OutOfStockProductsLazyQueryHookResult = ReturnType<typeof useOutOfStockProductsLazyQuery>;
export type OutOfStockProductsQueryResult = Apollo.QueryResult<OutOfStockProductsQuery, OutOfStockProductsQueryVariables>;