import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UsersByRoleQueryVariables = Types.Exact<{
  role: Types.Scalars['String']['input'];
}>;


export type UsersByRoleQuery = { __typename?: 'Query', usersByRole: Array<{ __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string }> };


export const UsersByRoleDocument = gql`
    query UsersByRole($role: String!) {
  usersByRole(role: $role) {
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
export function useUsersByRoleQuery(baseOptions: Apollo.QueryHookOptions<UsersByRoleQuery, UsersByRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersByRoleQuery, UsersByRoleQueryVariables>(UsersByRoleDocument, options);
      }
export function useUsersByRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersByRoleQuery, UsersByRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersByRoleQuery, UsersByRoleQueryVariables>(UsersByRoleDocument, options);
        }
export type UsersByRoleQueryHookResult = ReturnType<typeof useUsersByRoleQuery>;
export type UsersByRoleLazyQueryHookResult = ReturnType<typeof useUsersByRoleLazyQuery>;
export type UsersByRoleQueryResult = Apollo.QueryResult<UsersByRoleQuery, UsersByRoleQueryVariables>;