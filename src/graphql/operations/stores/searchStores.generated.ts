import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchStoresQueryVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
}>;


export type SearchStoresQuery = { __typename?: 'Query', searchStores: Array<{ __typename?: 'StoreType', _id: string, address: string, autoGenerateInvoiceNumbers: boolean, businessHours: any, city: string, country: string, createdAt: any, currency: string, defaultLowStockThreshold: number, description?: string | null, email?: string | null, enableInventoryTracking: boolean, enableLowStockAlerts: boolean, enableTax: boolean, invoicePrefix: string, language: string, logo?: string | null, metadata: any, name: string, nextInvoiceNumber: number, ownerId: string, phoneNumber: string, registrationNumber?: string | null, status: Types.StoreStatus, subscriptionExpiresAt?: any | null, subscriptionPlan: string, taxId?: string | null, taxName: string, taxRate: number, timezone?: string | null, updatedAt: any }> };


export const SearchStoresDocument = gql`
    query SearchStores($name: String!) {
  searchStores(name: $name) {
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
export function useSearchStoresQuery(baseOptions: Apollo.QueryHookOptions<SearchStoresQuery, SearchStoresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchStoresQuery, SearchStoresQueryVariables>(SearchStoresDocument, options);
      }
export function useSearchStoresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchStoresQuery, SearchStoresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchStoresQuery, SearchStoresQueryVariables>(SearchStoresDocument, options);
        }
export type SearchStoresQueryHookResult = ReturnType<typeof useSearchStoresQuery>;
export type SearchStoresLazyQueryHookResult = ReturnType<typeof useSearchStoresLazyQuery>;
export type SearchStoresQueryResult = Apollo.QueryResult<SearchStoresQuery, SearchStoresQueryVariables>;