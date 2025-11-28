import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkNotificationAsReadMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: { __typename?: 'Notification', _id: string, body: string, createdAt: any, data?: any | null, errorMessage?: string | null, fcmToken?: string | null, imageUrl?: string | null, isRead: boolean, messageId?: string | null, status: Types.NotificationStatus, title: string, topic?: string | null, type: Types.NotificationType, updatedAt: any, userId?: string | null } };


export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($id: String!) {
  markNotificationAsRead(id: $id) {
    _id
    body
    createdAt
    data
    errorMessage
    fcmToken
    imageUrl
    isRead
    messageId
    status
    title
    topic
    type
    updatedAt
    userId
  }
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;