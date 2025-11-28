import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuditsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuditsQuery = { __typename?: 'Query', audits: { __typename?: 'AuditListResponse', page: number, pageSize: number, total: number, audits: Array<{ __typename?: 'AuditType', _id: string, action: Types.AuditAction, createdAt: any, details: any, errorMessage?: string | null, ipAddress?: string | null, resource: Types.AuditResource, resourceId?: string | null, success: boolean, updatedAt: any, userAgent?: string | null, userId?: string | null, username?: string | null }> } };


export const AuditsDocument = gql`
    query Audits {
  audits {
    audits {
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
    page
    pageSize
    total
  }
}
    `;
export function useAuditsQuery(baseOptions?: Apollo.QueryHookOptions<AuditsQuery, AuditsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuditsQuery, AuditsQueryVariables>(AuditsDocument, options);
      }
export function useAuditsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuditsQuery, AuditsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuditsQuery, AuditsQueryVariables>(AuditsDocument, options);
        }
export type AuditsQueryHookResult = ReturnType<typeof useAuditsQuery>;
export type AuditsLazyQueryHookResult = ReturnType<typeof useAuditsLazyQuery>;
export type AuditsQueryResult = Apollo.QueryResult<AuditsQuery, AuditsQueryVariables>;