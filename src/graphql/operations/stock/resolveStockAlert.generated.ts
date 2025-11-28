import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ResolveStockAlertMutationVariables = Types.Exact<{
  alertId: Types.Scalars['String']['input'];
  notes?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type ResolveStockAlertMutation = { __typename?: 'Mutation', resolveStockAlert: { __typename?: 'StockAlertType', _id: string, acknowledgedAt?: any | null, acknowledgedBy?: string | null, assignedTo: Array<string>, createdAt: any, currentQuantity: number, metadata: any, minStockLevel: number, notificationSent: boolean, notificationSentAt?: any | null, productId: string, resolutionNotes?: string | null, resolvedAt?: any | null, resolvedBy?: string | null, status: Types.StockAlertStatusEnum, storeId: string, type: Types.StockAlertTypeEnum, updatedAt: any } };


export const ResolveStockAlertDocument = gql`
    mutation ResolveStockAlert($alertId: String!, $notes: String) {
  resolveStockAlert(alertId: $alertId, notes: $notes) {
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
export type ResolveStockAlertMutationFn = Apollo.MutationFunction<ResolveStockAlertMutation, ResolveStockAlertMutationVariables>;
export function useResolveStockAlertMutation(baseOptions?: Apollo.MutationHookOptions<ResolveStockAlertMutation, ResolveStockAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResolveStockAlertMutation, ResolveStockAlertMutationVariables>(ResolveStockAlertDocument, options);
      }
export type ResolveStockAlertMutationHookResult = ReturnType<typeof useResolveStockAlertMutation>;
export type ResolveStockAlertMutationResult = Apollo.MutationResult<ResolveStockAlertMutation>;
export type ResolveStockAlertMutationOptions = Apollo.BaseMutationOptions<ResolveStockAlertMutation, ResolveStockAlertMutationVariables>;