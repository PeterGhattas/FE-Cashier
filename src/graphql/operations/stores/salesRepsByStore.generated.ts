import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SalesRepsByStoreQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type SalesRepsByStoreQuery = { __typename?: 'Query', salesRepsByStore: Array<{ __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string }> };


export const SalesRepsByStoreDocument = gql`
    query SalesRepsByStore($storeId: String!) {
  salesRepsByStore(storeId: $storeId) {
    _id
    address
    assignedStores
    avatar
    createdAt
    deviceTokens
    email
    fullName
    isActive
    lastLogin
    permissions
    phoneNumber
    role
    storeId
    updatedAt
    username
  }
}
    `;
export function useSalesRepsByStoreQuery(baseOptions: Apollo.QueryHookOptions<SalesRepsByStoreQuery, SalesRepsByStoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SalesRepsByStoreQuery, SalesRepsByStoreQueryVariables>(SalesRepsByStoreDocument, options);
      }
export function useSalesRepsByStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SalesRepsByStoreQuery, SalesRepsByStoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SalesRepsByStoreQuery, SalesRepsByStoreQueryVariables>(SalesRepsByStoreDocument, options);
        }
export type SalesRepsByStoreQueryHookResult = ReturnType<typeof useSalesRepsByStoreQuery>;
export type SalesRepsByStoreLazyQueryHookResult = ReturnType<typeof useSalesRepsByStoreLazyQuery>;
export type SalesRepsByStoreQueryResult = Apollo.QueryResult<SalesRepsByStoreQuery, SalesRepsByStoreQueryVariables>;