import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTopSellingProductsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['ID']['input'];
}>;


export type GetTopSellingProductsQuery = { __typename?: 'Query', getTopSellingProducts: Array<{ __typename?: 'TopSellingProduct', productId: string, productName: string, salesCount: number, sku: string, totalQuantitySold: number, totalRevenue: number }> };


export const GetTopSellingProductsDocument = gql`
    query GetTopSellingProducts($storeId: ID!) {
  getTopSellingProducts(storeId: $storeId) {
    productId
    productName
    salesCount
    sku
    totalQuantitySold
    totalRevenue
  }
}
    `;
export function useGetTopSellingProductsQuery(baseOptions: Apollo.QueryHookOptions<GetTopSellingProductsQuery, GetTopSellingProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopSellingProductsQuery, GetTopSellingProductsQueryVariables>(GetTopSellingProductsDocument, options);
      }
export function useGetTopSellingProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopSellingProductsQuery, GetTopSellingProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopSellingProductsQuery, GetTopSellingProductsQueryVariables>(GetTopSellingProductsDocument, options);
        }
export type GetTopSellingProductsQueryHookResult = ReturnType<typeof useGetTopSellingProductsQuery>;
export type GetTopSellingProductsLazyQueryHookResult = ReturnType<typeof useGetTopSellingProductsLazyQuery>;
export type GetTopSellingProductsQueryResult = Apollo.QueryResult<GetTopSellingProductsQuery, GetTopSellingProductsQueryVariables>;