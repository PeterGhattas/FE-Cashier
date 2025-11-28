import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUnreadNotificationCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUnreadNotificationCountQuery = { __typename?: 'Query', getUnreadNotificationCount: number };


export const GetUnreadNotificationCountDocument = gql`
    query GetUnreadNotificationCount {
  getUnreadNotificationCount
}
    `;
export function useGetUnreadNotificationCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
      }
export function useGetUnreadNotificationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(GetUnreadNotificationCountDocument, options);
        }
export type GetUnreadNotificationCountQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountQuery>;
export type GetUnreadNotificationCountLazyQueryHookResult = ReturnType<typeof useGetUnreadNotificationCountLazyQuery>;
export type GetUnreadNotificationCountQueryResult = Apollo.QueryResult<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>;