import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreStockAlertsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type StoreStockAlertsQuery = { __typename?: 'Query', storeStockAlerts: Array<{ __typename?: 'StockAlertType', _id: string, acknowledgedAt?: any | null, acknowledgedBy?: string | null, assignedTo: Array<string>, createdAt: any, currentQuantity: number, metadata: any, minStockLevel: number, notificationSent: boolean, notificationSentAt?: any | null, productId: string, resolutionNotes?: string | null, resolvedAt?: any | null, resolvedBy?: string | null, status: Types.StockAlertStatusEnum, storeId: string, type: Types.StockAlertTypeEnum, updatedAt: any }> };


export const StoreStockAlertsDocument = gql`
    query StoreStockAlerts($storeId: String!) {
  storeStockAlerts(storeId: $storeId) {
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
export function useStoreStockAlertsQuery(baseOptions: Apollo.QueryHookOptions<StoreStockAlertsQuery, StoreStockAlertsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreStockAlertsQuery, StoreStockAlertsQueryVariables>(StoreStockAlertsDocument, options);
      }
export function useStoreStockAlertsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreStockAlertsQuery, StoreStockAlertsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreStockAlertsQuery, StoreStockAlertsQueryVariables>(StoreStockAlertsDocument, options);
        }
export type StoreStockAlertsQueryHookResult = ReturnType<typeof useStoreStockAlertsQuery>;
export type StoreStockAlertsLazyQueryHookResult = ReturnType<typeof useStoreStockAlertsLazyQuery>;
export type StoreStockAlertsQueryResult = Apollo.QueryResult<StoreStockAlertsQuery, StoreStockAlertsQueryVariables>;