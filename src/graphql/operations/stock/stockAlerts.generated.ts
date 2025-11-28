import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockAlertsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StockAlertsQuery = { __typename?: 'Query', stockAlerts: Array<{ __typename?: 'StockAlertType', _id: string, acknowledgedAt?: any | null, acknowledgedBy?: string | null, assignedTo: Array<string>, createdAt: any, currentQuantity: number, metadata: any, minStockLevel: number, notificationSent: boolean, notificationSentAt?: any | null, productId: string, resolutionNotes?: string | null, resolvedAt?: any | null, resolvedBy?: string | null, status: Types.StockAlertStatusEnum, storeId: string, type: Types.StockAlertTypeEnum, updatedAt: any }> };


export const StockAlertsDocument = gql`
    query StockAlerts {
  stockAlerts {
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
export function useStockAlertsQuery(baseOptions?: Apollo.QueryHookOptions<StockAlertsQuery, StockAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockAlertsQuery, StockAlertsQueryVariables>(StockAlertsDocument, options);
      }
export function useStockAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockAlertsQuery, StockAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockAlertsQuery, StockAlertsQueryVariables>(StockAlertsDocument, options);
        }
export type StockAlertsQueryHookResult = ReturnType<typeof useStockAlertsQuery>;
export type StockAlertsLazyQueryHookResult = ReturnType<typeof useStockAlertsLazyQuery>;
export type StockAlertsQueryResult = Apollo.QueryResult<StockAlertsQuery, StockAlertsQueryVariables>;