import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type StoreQuery = { __typename?: 'Query', store: { __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any } };


export const StoreDocument = gql`
    query Store($id: String!) {
  store(id: $id) {
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
export function useStoreQuery(baseOptions: Apollo.QueryHookOptions<StoreQuery, StoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreQuery, StoreQueryVariables>(StoreDocument, options);
      }
export function useStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreQuery, StoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreQuery, StoreQueryVariables>(StoreDocument, options);
        }
export type StoreQueryHookResult = ReturnType<typeof useStoreQuery>;
export type StoreLazyQueryHookResult = ReturnType<typeof useStoreLazyQuery>;
export type StoreQueryResult = Apollo.QueryResult<StoreQuery, StoreQueryVariables>;