import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreStatisticsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type StoreStatisticsQuery = { __typename?: 'Query', storeStatistics: any };


export const StoreStatisticsDocument = gql`
    query StoreStatistics($storeId: String!) {
  storeStatistics(storeId: $storeId)
}
    `;
export function useStoreStatisticsQuery(baseOptions: Apollo.QueryHookOptions<StoreStatisticsQuery, StoreStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreStatisticsQuery, StoreStatisticsQueryVariables>(StoreStatisticsDocument, options);
      }
export function useStoreStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreStatisticsQuery, StoreStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreStatisticsQuery, StoreStatisticsQueryVariables>(StoreStatisticsDocument, options);
        }
export type StoreStatisticsQueryHookResult = ReturnType<typeof useStoreStatisticsQuery>;
export type StoreStatisticsLazyQueryHookResult = ReturnType<typeof useStoreStatisticsLazyQuery>;
export type StoreStatisticsQueryResult = Apollo.QueryResult<StoreStatisticsQuery, StoreStatisticsQueryVariables>;