import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetOnlineMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SetOnlineMutation = { __typename?: 'Mutation', setOnline: { __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string } };


export const SetOnlineDocument = gql`
    mutation SetOnline {
  setOnline {
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
export type SetOnlineMutationFn = Apollo.MutationFunction<SetOnlineMutation, SetOnlineMutationVariables>;
export function useSetOnlineMutation(baseOptions?: Apollo.MutationHookOptions<SetOnlineMutation, SetOnlineMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetOnlineMutation, SetOnlineMutationVariables>(SetOnlineDocument, options);
      }
export type SetOnlineMutationHookResult = ReturnType<typeof useSetOnlineMutation>;
export type SetOnlineMutationResult = Apollo.MutationResult<SetOnlineMutation>;
export type SetOnlineMutationOptions = Apollo.BaseMutationOptions<SetOnlineMutation, SetOnlineMutationVariables>;