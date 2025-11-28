import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TopSellingProductsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type TopSellingProductsQuery = { __typename?: 'Query', topSellingProducts: Array<{ __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, image?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any }> };


export const TopSellingProductsDocument = gql`
    query TopSellingProducts($storeId: String!) {
  topSellingProducts(storeId: $storeId) {
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
export function useTopSellingProductsQuery(baseOptions: Apollo.QueryHookOptions<TopSellingProductsQuery, TopSellingProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopSellingProductsQuery, TopSellingProductsQueryVariables>(TopSellingProductsDocument, options);
      }
export function useTopSellingProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopSellingProductsQuery, TopSellingProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopSellingProductsQuery, TopSellingProductsQueryVariables>(TopSellingProductsDocument, options);
        }
export type TopSellingProductsQueryHookResult = ReturnType<typeof useTopSellingProductsQuery>;
export type TopSellingProductsLazyQueryHookResult = ReturnType<typeof useTopSellingProductsLazyQuery>;
export type TopSellingProductsQueryResult = Apollo.QueryResult<TopSellingProductsQuery, TopSellingProductsQueryVariables>;