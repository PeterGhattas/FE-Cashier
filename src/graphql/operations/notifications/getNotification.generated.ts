import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNotificationQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification: { __typename?: 'Notification', _id: string, body: string, createdAt: any, data?: any | null, errorMessage?: string | null, fcmToken?: string | null, imageUrl?: string | null, isRead: boolean, messageId?: string | null, status: Types.NotificationStatus, title: string, topic?: string | null, type: Types.NotificationType, updatedAt: any, userId?: string | null } };


export const GetNotificationDocument = gql`
    query GetNotification($id: String!) {
  getNotification(id: $id) {
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
export function useGetNotificationQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, options);
      }
export function useGetNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, options);
        }
export type GetNotificationQueryHookResult = ReturnType<typeof useGetNotificationQuery>;
export type GetNotificationLazyQueryHookResult = ReturnType<typeof useGetNotificationLazyQuery>;
export type GetNotificationQueryResult = Apollo.QueryResult<GetNotificationQuery, GetNotificationQueryVariables>;