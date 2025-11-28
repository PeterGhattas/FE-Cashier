import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetOfflineMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SetOfflineMutation = { __typename?: 'Mutation', setOffline: { __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string } };


export const SetOfflineDocument = gql`
    mutation SetOffline {
  setOffline {
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
export type SetOfflineMutationFn = Apollo.MutationFunction<SetOfflineMutation, SetOfflineMutationVariables>;
export function useSetOfflineMutation(baseOptions?: Apollo.MutationHookOptions<SetOfflineMutation, SetOfflineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOfflineMutation, SetOfflineMutationVariables>(SetOfflineDocument, options);
      }
export type SetOfflineMutationHookResult = ReturnType<typeof useSetOfflineMutation>;
export type SetOfflineMutationResult = Apollo.MutationResult<SetOfflineMutation>;
export type SetOfflineMutationOptions = Apollo.BaseMutationOptions<SetOfflineMutation, SetOfflineMutationVariables>;