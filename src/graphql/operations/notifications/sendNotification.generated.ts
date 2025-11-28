import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendNotificationMutationVariables = Types.Exact<{
  input: Types.SendNotificationInput;
}>;


export type SendNotificationMutation = { __typename?: 'Mutation', sendNotification: { __typename?: 'Notification', _id: string, body: string, createdAt: any, data?: any | null, errorMessage?: string | null, fcmToken?: string | null, imageUrl?: string | null, isRead: boolean, messageId?: string | null, status: Types.NotificationStatus, title: string, topic?: string | null, type: Types.NotificationType, updatedAt: any, userId?: string | null } };


export const SendNotificationDocument = gql`
    mutation SendNotification($input: SendNotificationInput!) {
  sendNotification(input: $input) {
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
export type SendNotificationMutationFn = Apollo.MutationFunction<SendNotificationMutation, SendNotificationMutationVariables>;
export function useSendNotificationMutation(baseOptions?: Apollo.MutationHookOptions<SendNotificationMutation, SendNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendNotificationMutation, SendNotificationMutationVariables>(SendNotificationDocument, options);
      }
export type SendNotificationMutationHookResult = ReturnType<typeof useSendNotificationMutation>;
export type SendNotificationMutationResult = Apollo.MutationResult<SendNotificationMutation>;
export type SendNotificationMutationOptions = Apollo.BaseMutationOptions<SendNotificationMutation, SendNotificationMutationVariables>;