import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockSummaryQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type StockSummaryQuery = { __typename?: 'Query', stockSummary: any };


export const StockSummaryDocument = gql`
    query StockSummary($storeId: String!) {
  stockSummary(storeId: $storeId)
}
    `;
export function useStockSummaryQuery(baseOptions: Apollo.QueryHookOptions<StockSummaryQuery, StockSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockSummaryQuery, StockSummaryQueryVariables>(StockSummaryDocument, options);
      }
export function useStockSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockSummaryQuery, StockSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockSummaryQuery, StockSummaryQueryVariables>(StockSummaryDocument, options);
        }
export type StockSummaryQueryHookResult = ReturnType<typeof useStockSummaryQuery>;
export type StockSummaryLazyQueryHookResult = ReturnType<typeof useStockSummaryLazyQuery>;
export type StockSummaryQueryResult = Apollo.QueryResult<StockSummaryQuery, StockSummaryQueryVariables>;