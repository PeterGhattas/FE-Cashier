import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyNotificationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyNotificationsQuery = { __typename?: 'Query', getMyNotifications: Array<{ __typename?: 'Notification', _id: string, body: string, createdAt: any, data?: any | null, errorMessage?: string | null, fcmToken?: string | null, imageUrl?: string | null, isRead: boolean, messageId?: string | null, status: Types.NotificationStatus, title: string, topic?: string | null, type: Types.NotificationType, updatedAt: any, userId?: string | null }> };


export const GetMyNotificationsDocument = gql`
    query GetMyNotifications {
  getMyNotifications {
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
export function useGetMyNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, options);
      }
export function useGetMyNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, options);
        }
export type GetMyNotificationsQueryHookResult = ReturnType<typeof useGetMyNotificationsQuery>;
export type GetMyNotificationsLazyQueryHookResult = ReturnType<typeof useGetMyNotificationsLazyQuery>;
export type GetMyNotificationsQueryResult = Apollo.QueryResult<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;