import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyStockAlertsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyStockAlertsQuery = { __typename?: 'Query', myStockAlerts: Array<{ __typename?: 'StockAlertType', _id: string, acknowledgedAt?: any | null, acknowledgedBy?: string | null, assignedTo: Array<string>, createdAt: any, currentQuantity: number, metadata: any, minStockLevel: number, notificationSent: boolean, notificationSentAt?: any | null, productId: string, resolutionNotes?: string | null, resolvedAt?: any | null, resolvedBy?: string | null, status: Types.StockAlertStatusEnum, storeId: string, type: Types.StockAlertTypeEnum, updatedAt: any }> };


export const MyStockAlertsDocument = gql`
    query MyStockAlerts {
  myStockAlerts {
    _id
    acknowledgedAt
    acknowledgedBy
    assignedTo
    createdAt
    currentQuantity
    metadata
    minStockLevel
    notificationSent
    notificationSentAt
    productId
    resolutionNotes
    resolvedAt
    resolvedBy
    status
    storeId
    type
    updatedAt
  }
}
    `;
export function useMyStockAlertsQuery(baseOptions?: Apollo.QueryHookOptions<MyStockAlertsQuery, MyStockAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyStockAlertsQuery, MyStockAlertsQueryVariables>(MyStockAlertsDocument, options);
      }
export function useMyStockAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyStockAlertsQuery, MyStockAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyStockAlertsQuery, MyStockAlertsQueryVariables>(MyStockAlertsDocument, options);
        }
export type MyStockAlertsQueryHookResult = ReturnType<typeof useMyStockAlertsQuery>;
export type MyStockAlertsLazyQueryHookResult = ReturnType<typeof useMyStockAlertsLazyQuery>;
export type MyStockAlertsQueryResult = Apollo.QueryResult<MyStockAlertsQuery, MyStockAlertsQueryVariables>;