import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyPresenceQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyPresenceQuery = { __typename?: 'Query', getMyPresence?: { __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string } | null };


export const GetMyPresenceDocument = gql`
    query GetMyPresence {
  getMyPresence {
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
export function useGetMyPresenceQuery(baseOptions?: Apollo.QueryHookOptions<GetMyPresenceQuery, GetMyPresenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyPresenceQuery, GetMyPresenceQueryVariables>(GetMyPresenceDocument, options);
      }
export function useGetMyPresenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyPresenceQuery, GetMyPresenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyPresenceQuery, GetMyPresenceQueryVariables>(GetMyPresenceDocument, options);
        }
export type GetMyPresenceQueryHookResult = ReturnType<typeof useGetMyPresenceQuery>;
export type GetMyPresenceLazyQueryHookResult = ReturnType<typeof useGetMyPresenceLazyQuery>;
export type GetMyPresenceQueryResult = Apollo.QueryResult<GetMyPresenceQuery, GetMyPresenceQueryVariables>;