import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUsersPresenceQueryVariables = Types.Exact<{
  userIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type GetUsersPresenceQuery = { __typename?: 'Query', getUsersPresence: Array<{ __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string }> };


export const GetUsersPresenceDocument = gql`
    query GetUsersPresence($userIds: [String!]!) {
  getUsersPresence(userIds: $userIds) {
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
export function useGetUsersPresenceQuery(baseOptions: Apollo.QueryHookOptions<GetUsersPresenceQuery, GetUsersPresenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersPresenceQuery, GetUsersPresenceQueryVariables>(GetUsersPresenceDocument, options);
      }
export function useGetUsersPresenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersPresenceQuery, GetUsersPresenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersPresenceQuery, GetUsersPresenceQueryVariables>(GetUsersPresenceDocument, options);
        }
export type GetUsersPresenceQueryHookResult = ReturnType<typeof useGetUsersPresenceQuery>;
export type GetUsersPresenceLazyQueryHookResult = ReturnType<typeof useGetUsersPresenceLazyQuery>;
export type GetUsersPresenceQueryResult = Apollo.QueryResult<GetUsersPresenceQuery, GetUsersPresenceQueryVariables>;