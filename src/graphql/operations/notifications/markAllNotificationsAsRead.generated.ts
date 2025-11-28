import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkAllNotificationsAsReadMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: number };


export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;