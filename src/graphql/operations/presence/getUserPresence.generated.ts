import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserPresenceQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type GetUserPresenceQuery = { __typename?: 'Query', getUserPresence?: { __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string } | null };


export const GetUserPresenceDocument = gql`
    query GetUserPresence($userId: String!) {
  getUserPresence(userId: $userId) {
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
export function useGetUserPresenceQuery(baseOptions: Apollo.QueryHookOptions<GetUserPresenceQuery, GetUserPresenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPresenceQuery, GetUserPresenceQueryVariables>(GetUserPresenceDocument, options);
      }
export function useGetUserPresenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPresenceQuery, GetUserPresenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPresenceQuery, GetUserPresenceQueryVariables>(GetUserPresenceDocument, options);
        }
export type GetUserPresenceQueryHookResult = ReturnType<typeof useGetUserPresenceQuery>;
export type GetUserPresenceLazyQueryHookResult = ReturnType<typeof useGetUserPresenceLazyQuery>;
export type GetUserPresenceQueryResult = Apollo.QueryResult<GetUserPresenceQuery, GetUserPresenceQueryVariables>;