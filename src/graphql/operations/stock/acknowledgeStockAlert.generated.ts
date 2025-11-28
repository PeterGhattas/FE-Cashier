import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcknowledgeStockAlertMutationVariables = Types.Exact<{
  alertId: Types.Scalars['String']['input'];
}>;


export type AcknowledgeStockAlertMutation = { __typename?: 'Mutation', acknowledgeStockAlert: { __typename?: 'StockAlertType', _id: string, acknowledgedAt?: any | null, acknowledgedBy?: string | null, assignedTo: Array<string>, createdAt: any, currentQuantity: number, metadata: any, minStockLevel: number, notificationSent: boolean, notificationSentAt?: any | null, productId: string, resolutionNotes?: string | null, resolvedAt?: any | null, resolvedBy?: string | null, status: Types.StockAlertStatusEnum, storeId: string, type: Types.StockAlertTypeEnum, updatedAt: any } };


export const AcknowledgeStockAlertDocument = gql`
    mutation AcknowledgeStockAlert($alertId: String!) {
  acknowledgeStockAlert(alertId: $alertId) {
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
export type AcknowledgeStockAlertMutationFn = Apollo.MutationFunction<AcknowledgeStockAlertMutation, AcknowledgeStockAlertMutationVariables>;
export function useAcknowledgeStockAlertMutation(baseOptions?: Apollo.MutationHookOptions<AcknowledgeStockAlertMutation, AcknowledgeStockAlertMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcknowledgeStockAlertMutation, AcknowledgeStockAlertMutationVariables>(AcknowledgeStockAlertDocument, options);
      }
export type AcknowledgeStockAlertMutationHookResult = ReturnType<typeof useAcknowledgeStockAlertMutation>;
export type AcknowledgeStockAlertMutationResult = Apollo.MutationResult<AcknowledgeStockAlertMutation>;
export type AcknowledgeStockAlertMutationOptions = Apollo.BaseMutationOptions<AcknowledgeStockAlertMutation, AcknowledgeStockAlertMutationVariables>;