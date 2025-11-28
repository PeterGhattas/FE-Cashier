import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuditsByActionQueryVariables = Types.Exact<{
  action: Types.Scalars['String']['input'];
}>;


export type AuditsByActionQuery = { __typename?: 'Query', auditsByAction: Array<{ __typename?: 'AuditType', _id: string, action: Types.AuditAction, createdAt: any, details: any, errorMessage?: string | null, ipAddress?: string | null, resource: Types.AuditResource, resourceId?: string | null, success: boolean, updatedAt: any, userAgent?: string | null, userId?: string | null, username?: string | null }> };


export const AuditsByActionDocument = gql`
    query AuditsByAction($action: String!) {
  auditsByAction(action: $action) {
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
export function useAuditsByActionQuery(baseOptions: Apollo.QueryHookOptions<AuditsByActionQuery, AuditsByActionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuditsByActionQuery, AuditsByActionQueryVariables>(AuditsByActionDocument, options);
      }
export function useAuditsByActionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuditsByActionQuery, AuditsByActionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuditsByActionQuery, AuditsByActionQueryVariables>(AuditsByActionDocument, options);
        }
export type AuditsByActionQueryHookResult = ReturnType<typeof useAuditsByActionQuery>;
export type AuditsByActionLazyQueryHookResult = ReturnType<typeof useAuditsByActionLazyQuery>;
export type AuditsByActionQueryResult = Apollo.QueryResult<AuditsByActionQuery, AuditsByActionQueryVariables>;