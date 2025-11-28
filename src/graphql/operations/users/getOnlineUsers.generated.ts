import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOnlineUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetOnlineUsersQuery = { __typename?: 'Query', getOnlineUsers: Array<{ __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string }> };


export const GetOnlineUsersDocument = gql`
    query GetOnlineUsers {
  getOnlineUsers {
    _id
    createdAt
    lastActivity
    lastSeen
    status
    updatedAt
    userId
  }
}
    `;
export function useGetOnlineUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
      }
export function useGetOnlineUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>(GetOnlineUsersDocument, options);
        }
export type GetOnlineUsersQueryHookResult = ReturnType<typeof useGetOnlineUsersQuery>;
export type GetOnlineUsersLazyQueryHookResult = ReturnType<typeof useGetOnlineUsersLazyQuery>;
export type GetOnlineUsersQueryResult = Apollo.QueryResult<GetOnlineUsersQuery, GetOnlineUsersQueryVariables>;