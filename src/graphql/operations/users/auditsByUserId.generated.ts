import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuditsByUserIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type AuditsByUserIdQuery = { __typename?: 'Query', auditsByUserId: Array<{ __typename?: 'AuditType', _id: string, action: Types.AuditAction, createdAt: any, details: any, errorMessage?: string | null, ipAddress?: string | null, resource: Types.AuditResource, resourceId?: string | null, success: boolean, updatedAt: any, userAgent?: string | null, userId?: string | null, username?: string | null }> };


export const AuditsByUserIdDocument = gql`
    query AuditsByUserId($userId: String!) {
  auditsByUserId(userId: $userId) {
    _id
    action
    createdAt
    details
    errorMessage
    ipAddress
    resource
    resourceId
    success
    updatedAt
    userAgent
    userId
    username
  }
}
    `;
export function useAuditsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<AuditsByUserIdQuery, AuditsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuditsByUserIdQuery, AuditsByUserIdQueryVariables>(AuditsByUserIdDocument, options);
      }
export function useAuditsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuditsByUserIdQuery, AuditsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuditsByUserIdQuery, AuditsByUserIdQueryVariables>(AuditsByUserIdDocument, options);
        }
export type AuditsByUserIdQueryHookResult = ReturnType<typeof useAuditsByUserIdQuery>;
export type AuditsByUserIdLazyQueryHookResult = ReturnType<typeof useAuditsByUserIdLazyQuery>;
export type AuditsByUserIdQueryResult = Apollo.QueryResult<AuditsByUserIdQuery, AuditsByUserIdQueryVariables>;