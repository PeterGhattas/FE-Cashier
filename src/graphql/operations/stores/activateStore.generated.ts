import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActivateStoreMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type ActivateStoreMutation = { __typename?: 'Mutation', activateStore: { __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any } };


export const ActivateStoreDocument = gql`
    mutation ActivateStore($id: String!) {
  activateStore(id: $id) {
    _id
    address
    autoGenerateInvoiceNumbers
    businessHours
    city
    country
    createdAt
    currency
    defaultLowStockThreshold
    description
    email
    enableInventoryTracking
    enableLowStockAlerts
    enableTax
    invoicePrefix
    language
    logo
    metadata
    name
    nextInvoiceNumber
    ownerId
    phoneNumber
    registrationNumber
    status
    subscriptionExpiresAt
    subscriptionPlan
    taxId
    taxName
    taxRate
    timezone
    updatedAt
  }
}
    `;
export type ActivateStoreMutationFn = Apollo.MutationFunction<ActivateStoreMutation, ActivateStoreMutationVariables>;
export function useActivateStoreMutation(baseOptions?: Apollo.MutationHookOptions<ActivateStoreMutation, ActivateStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateStoreMutation, ActivateStoreMutationVariables>(ActivateStoreDocument, options);
      }
export type ActivateStoreMutationHookResult = ReturnType<typeof useActivateStoreMutation>;
export type ActivateStoreMutationResult = Apollo.MutationResult<ActivateStoreMutation>;
export type ActivateStoreMutationOptions = Apollo.BaseMutationOptions<ActivateStoreMutation, ActivateStoreMutationVariables>;