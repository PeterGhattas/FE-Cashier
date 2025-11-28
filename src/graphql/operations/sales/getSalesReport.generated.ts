import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSalesReportQueryVariables = Types.Exact<{
  endDate: Types.Scalars['String']['input'];
  startDate: Types.Scalars['String']['input'];
  storeId: Types.Scalars['ID']['input'];
}>;


export type GetSalesReportQuery = { __typename?: 'Query', getSalesReport: { __typename?: 'SalesReport', averageSaleAmount: number, cancelledSales: number, completedSales: number, endDate: string, refundedSales: number, startDate: string, storeId: string, totalCost: number, totalDiscount: number, totalProfit: number, totalRevenue: number, totalSales: number, totalTax: number } };


export const GetSalesReportDocument = gql`
    query GetSalesReport($endDate: String!, $startDate: String!, $storeId: ID!) {
  getSalesReport(endDate: $endDate, startDate: $startDate, storeId: $storeId) {
    averageSaleAmount
    cancelledSales
    completedSales
    endDate
    refundedSales
    startDate
    storeId
    totalCost
    totalDiscount
    totalProfit
    totalRevenue
    totalSales
    totalTax
  }
}
    `;
export function useGetSalesReportQuery(baseOptions: Apollo.QueryHookOptions<GetSalesReportQuery, GetSalesReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesReportQuery, GetSalesReportQueryVariables>(GetSalesReportDocument, options);
      }
export function useGetSalesReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesReportQuery, GetSalesReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesReportQuery, GetSalesReportQueryVariables>(GetSalesReportDocument, options);
        }
export type GetSalesReportQueryHookResult = ReturnType<typeof useGetSalesReportQuery>;
export type GetSalesReportLazyQueryHookResult = ReturnType<typeof useGetSalesReportLazyQuery>;
export type GetSalesReportQueryResult = Apollo.QueryResult<GetSalesReportQuery, GetSalesReportQueryVariables>;