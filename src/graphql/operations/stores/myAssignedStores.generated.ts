import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyAssignedStoresQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyAssignedStoresQuery = { __typename?: 'Query', myAssignedStores: Array<{ __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any }> };


export const MyAssignedStoresDocument = gql`
    query MyAssignedStores {
  myAssignedStores {
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
export function useMyAssignedStoresQuery(baseOptions?: Apollo.QueryHookOptions<MyAssignedStoresQuery, MyAssignedStoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAssignedStoresQuery, MyAssignedStoresQueryVariables>(MyAssignedStoresDocument, options);
      }
export function useMyAssignedStoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAssignedStoresQuery, MyAssignedStoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAssignedStoresQuery, MyAssignedStoresQueryVariables>(MyAssignedStoresDocument, options);
        }
export type MyAssignedStoresQueryHookResult = ReturnType<typeof useMyAssignedStoresQuery>;
export type MyAssignedStoresLazyQueryHookResult = ReturnType<typeof useMyAssignedStoresLazyQuery>;
export type MyAssignedStoresQueryResult = Apollo.QueryResult<MyAssignedStoresQuery, MyAssignedStoresQueryVariables>;