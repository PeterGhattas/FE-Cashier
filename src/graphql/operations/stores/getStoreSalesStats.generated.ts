import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStoreSalesStatsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['ID']['input'];
}>;


export type GetStoreSalesStatsQuery = { __typename?: 'Query', getStoreSalesStats: { __typename?: 'StoreSalesStats', lowStockProductsCount: number, storeId: string, storeName: string, thisMonthRevenue: number, thisMonthSales: number, thisWeekRevenue: number, thisWeekSales: number, todayRevenue: number, todaySales: number } };


export const GetStoreSalesStatsDocument = gql`
    query GetStoreSalesStats($storeId: ID!) {
  getStoreSalesStats(storeId: $storeId) {
    lowStockProductsCount
    storeId
    storeName
    thisMonthRevenue
    thisMonthSales
    thisWeekRevenue
    thisWeekSales
    todayRevenue
    todaySales
  }
}
    `;
export function useGetStoreSalesStatsQuery(baseOptions: Apollo.QueryHookOptions<GetStoreSalesStatsQuery, GetStoreSalesStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStoreSalesStatsQuery, GetStoreSalesStatsQueryVariables>(GetStoreSalesStatsDocument, options);
      }
export function useGetStoreSalesStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStoreSalesStatsQuery, GetStoreSalesStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStoreSalesStatsQuery, GetStoreSalesStatsQueryVariables>(GetStoreSalesStatsDocument, options);
        }
export type GetStoreSalesStatsQueryHookResult = ReturnType<typeof useGetStoreSalesStatsQuery>;
export type GetStoreSalesStatsLazyQueryHookResult = ReturnType<typeof useGetStoreSalesStatsLazyQuery>;
export type GetStoreSalesStatsQueryResult = Apollo.QueryResult<GetStoreSalesStatsQuery, GetStoreSalesStatsQueryVariables>;