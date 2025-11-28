import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoresQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StoresQuery = { __typename?: 'Query', stores: Array<{ __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any }> };


export const StoresDocument = gql`
    query Stores {
  stores {
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
export function useStoresQuery(baseOptions?: Apollo.QueryHookOptions<StoresQuery, StoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoresQuery, StoresQueryVariables>(StoresDocument, options);
      }
export function useStoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoresQuery, StoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoresQuery, StoresQueryVariables>(StoresDocument, options);
        }
export type StoresQueryHookResult = ReturnType<typeof useStoresQuery>;
export type StoresLazyQueryHookResult = ReturnType<typeof useStoresLazyQuery>;
export type StoresQueryResult = Apollo.QueryResult<StoresQuery, StoresQueryVariables>;