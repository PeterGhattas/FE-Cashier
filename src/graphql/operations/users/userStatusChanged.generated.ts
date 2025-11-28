import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserStatusChangedSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type UserStatusChangedSubscription = { __typename?: 'Subscription', userStatusChanged: { __typename?: 'Presence', _id: string, createdAt: any, lastActivity?: any | null, lastSeen: any, status: Types.UserStatus, updatedAt: any, userId: string } };


export const UserStatusChangedDocument = gql`
    subscription UserStatusChanged {
  userStatusChanged {
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
export function useUserStatusChangedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserStatusChangedSubscription, UserStatusChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserStatusChangedSubscription, UserStatusChangedSubscriptionVariables>(UserStatusChangedDocument, options);
      }
export type UserStatusChangedSubscriptionHookResult = ReturnType<typeof useUserStatusChangedSubscription>;
export type UserStatusChangedSubscriptionResult = Apollo.SubscriptionResult<UserStatusChangedSubscription>;