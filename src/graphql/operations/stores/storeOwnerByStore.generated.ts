import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreOwnerByStoreQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type StoreOwnerByStoreQuery = { __typename?: 'Query', storeOwnerByStore?: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } | null };


export const StoreOwnerByStoreDocument = gql`
    query StoreOwnerByStore($storeId: String!) {
  storeOwnerByStore(storeId: $storeId) {
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
export function useStoreOwnerByStoreQuery(baseOptions: Apollo.QueryHookOptions<StoreOwnerByStoreQuery, StoreOwnerByStoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreOwnerByStoreQuery, StoreOwnerByStoreQueryVariables>(StoreOwnerByStoreDocument, options);
      }
export function useStoreOwnerByStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreOwnerByStoreQuery, StoreOwnerByStoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreOwnerByStoreQuery, StoreOwnerByStoreQueryVariables>(StoreOwnerByStoreDocument, options);
        }
export type StoreOwnerByStoreQueryHookResult = ReturnType<typeof useStoreOwnerByStoreQuery>;
export type StoreOwnerByStoreLazyQueryHookResult = ReturnType<typeof useStoreOwnerByStoreLazyQuery>;
export type StoreOwnerByStoreQueryResult = Apollo.QueryResult<StoreOwnerByStoreQuery, StoreOwnerByStoreQueryVariables>;