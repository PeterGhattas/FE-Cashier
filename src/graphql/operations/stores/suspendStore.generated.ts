import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SuspendStoreMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type SuspendStoreMutation = { __typename?: 'Mutation', suspendStore: { __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any } };


export const SuspendStoreDocument = gql`
    mutation SuspendStore($id: String!) {
  suspendStore(id: $id) {
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
export type SuspendStoreMutationFn = Apollo.MutationFunction<SuspendStoreMutation, SuspendStoreMutationVariables>;
export function useSuspendStoreMutation(baseOptions?: Apollo.MutationHookOptions<SuspendStoreMutation, SuspendStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SuspendStoreMutation, SuspendStoreMutationVariables>(SuspendStoreDocument, options);
      }
export type SuspendStoreMutationHookResult = ReturnType<typeof useSuspendStoreMutation>;
export type SuspendStoreMutationResult = Apollo.MutationResult<SuspendStoreMutation>;
export type SuspendStoreMutationOptions = Apollo.BaseMutationOptions<SuspendStoreMutation, SuspendStoreMutationVariables>;