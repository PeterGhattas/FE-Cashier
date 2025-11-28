import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUnreadMessageCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUnreadMessageCountQuery = { __typename?: 'Query', getUnreadMessageCount: number };


export const GetUnreadMessageCountDocument = gql`
    query GetUnreadMessageCount {
  getUnreadMessageCount
}
    `;
export function useGetUnreadMessageCountQuery(baseOptions?: Apollo.QueryHookOptions<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>(GetUnreadMessageCountDocument, options);
      }
export function useGetUnreadMessageCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>(GetUnreadMessageCountDocument, options);
        }
export type GetUnreadMessageCountQueryHookResult = ReturnType<typeof useGetUnreadMessageCountQuery>;
export type GetUnreadMessageCountLazyQueryHookResult = ReturnType<typeof useGetUnreadMessageCountLazyQuery>;
export type GetUnreadMessageCountQueryResult = Apollo.QueryResult<GetUnreadMessageCountQuery, GetUnreadMessageCountQueryVariables>;