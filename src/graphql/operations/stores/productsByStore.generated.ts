import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductsByStoreQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type ProductsByStoreQuery = { __typename?: 'Query', productsByStore: Array<{ __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, image?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any }> };


export const ProductsByStoreDocument = gql`
    query ProductsByStore($storeId: String!) {
  productsByStore(storeId: $storeId) {
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
export function useProductsByStoreQuery(baseOptions: Apollo.QueryHookOptions<ProductsByStoreQuery, ProductsByStoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsByStoreQuery, ProductsByStoreQueryVariables>(ProductsByStoreDocument, options);
      }
export function useProductsByStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsByStoreQuery, ProductsByStoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsByStoreQuery, ProductsByStoreQueryVariables>(ProductsByStoreDocument, options);
        }
export type ProductsByStoreQueryHookResult = ReturnType<typeof useProductsByStoreQuery>;
export type ProductsByStoreLazyQueryHookResult = ReturnType<typeof useProductsByStoreLazyQuery>;
export type ProductsByStoreQueryResult = Apollo.QueryResult<ProductsByStoreQuery, ProductsByStoreQueryVariables>;