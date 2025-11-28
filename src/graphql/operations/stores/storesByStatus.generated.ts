import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoresByStatusQueryVariables = Types.Exact<{
  status: Types.Scalars['String']['input'];
}>;


export type StoresByStatusQuery = { __typename?: 'Query', storesByStatus: Array<{ __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any }> };


export const StoresByStatusDocument = gql`
    query StoresByStatus($status: String!) {
  storesByStatus(status: $status) {
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
export function useStoresByStatusQuery(baseOptions: Apollo.QueryHookOptions<StoresByStatusQuery, StoresByStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoresByStatusQuery, StoresByStatusQueryVariables>(StoresByStatusDocument, options);
      }
export function useStoresByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoresByStatusQuery, StoresByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoresByStatusQuery, StoresByStatusQueryVariables>(StoresByStatusDocument, options);
        }
export type StoresByStatusQueryHookResult = ReturnType<typeof useStoresByStatusQuery>;
export type StoresByStatusLazyQueryHookResult = ReturnType<typeof useStoresByStatusLazyQuery>;
export type StoresByStatusQueryResult = Apollo.QueryResult<StoresByStatusQuery, StoresByStatusQueryVariables>;