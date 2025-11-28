import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkAllMessagesAsReadMutationVariables = Types.Exact<{
  otherUserId: Types.Scalars['String']['input'];
}>;


export type MarkAllMessagesAsReadMutation = { __typename?: 'Mutation', markAllMessagesAsRead: number };


export const MarkAllMessagesAsReadDocument = gql`
    mutation MarkAllMessagesAsRead($otherUserId: String!) {
  markAllMessagesAsRead(otherUserId: $otherUserId)
}
    `;
export type MarkAllMessagesAsReadMutationFn = Apollo.MutationFunction<MarkAllMessagesAsReadMutation, MarkAllMessagesAsReadMutationVariables>;
export function useMarkAllMessagesAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllMessagesAsReadMutation, MarkAllMessagesAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllMessagesAsReadMutation, MarkAllMessagesAsReadMutationVariables>(MarkAllMessagesAsReadDocument, options);
      }
export type MarkAllMessagesAsReadMutationHookResult = ReturnType<typeof useMarkAllMessagesAsReadMutation>;
export type MarkAllMessagesAsReadMutationResult = Apollo.MutationResult<MarkAllMessagesAsReadMutation>;
export type MarkAllMessagesAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllMessagesAsReadMutation, MarkAllMessagesAsReadMutationVariables>;