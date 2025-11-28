import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyStoreQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyStoreQuery = { __typename?: 'Query', myStore?: { __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any } | null };


export const MyStoreDocument = gql`
    query MyStore {
  myStore {
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
export function useMyStoreQuery(baseOptions?: Apollo.QueryHookOptions<MyStoreQuery, MyStoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyStoreQuery, MyStoreQueryVariables>(MyStoreDocument, options);
      }
export function useMyStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyStoreQuery, MyStoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyStoreQuery, MyStoreQueryVariables>(MyStoreDocument, options);
        }
export type MyStoreQueryHookResult = ReturnType<typeof useMyStoreQuery>;
export type MyStoreLazyQueryHookResult = ReturnType<typeof useMyStoreLazyQuery>;
export type MyStoreQueryResult = Apollo.QueryResult<MyStoreQuery, MyStoreQueryVariables>;