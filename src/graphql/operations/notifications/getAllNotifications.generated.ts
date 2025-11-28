import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetAllNotificationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllNotificationsQuery = { __typename?: 'Query', getAllNotifications: Array<{ __typename?: 'Notification', _id: string, body: string, createdAt: any, data?: any | null, errorMessage?: string | null, fcmToken?: string | null, imageUrl?: string | null, isRead: boolean, messageId?: string | null, status: Types.NotificationStatus, title: string, topic?: string | null, type: Types.NotificationType, updatedAt: any, userId?: string | null }> };


export const GetAllNotificationsDocument = gql`
    query GetAllNotifications {
  getAllNotifications {
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
export function useGetAllNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>(GetAllNotificationsDocument, options);
      }
export function useGetAllNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>(GetAllNotificationsDocument, options);
        }
export type GetAllNotificationsQueryHookResult = ReturnType<typeof useGetAllNotificationsQuery>;
export type GetAllNotificationsLazyQueryHookResult = ReturnType<typeof useGetAllNotificationsLazyQuery>;
export type GetAllNotificationsQueryResult = Apollo.QueryResult<GetAllNotificationsQuery, GetAllNotificationsQueryVariables>;