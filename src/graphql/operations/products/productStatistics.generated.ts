import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductStatisticsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type ProductStatisticsQuery = { __typename?: 'Query', productStatistics: any };


export const ProductStatisticsDocument = gql`
    query ProductStatistics($storeId: String!) {
  productStatistics(storeId: $storeId)
}
    `;
export function useProductStatisticsQuery(baseOptions: Apollo.QueryHookOptions<ProductStatisticsQuery, ProductStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductStatisticsQuery, ProductStatisticsQueryVariables>(ProductStatisticsDocument, options);
      }
export function useProductStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductStatisticsQuery, ProductStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductStatisticsQuery, ProductStatisticsQueryVariables>(ProductStatisticsDocument, options);
        }
export type ProductStatisticsQueryHookResult = ReturnType<typeof useProductStatisticsQuery>;
export type ProductStatisticsLazyQueryHookResult = ReturnType<typeof useProductStatisticsLazyQuery>;
export type ProductStatisticsQueryResult = Apollo.QueryResult<ProductStatisticsQuery, ProductStatisticsQueryVariables>;