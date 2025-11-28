import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnreadMessageCountChangedSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type UnreadMessageCountChangedSubscription = { __typename?: 'Subscription', unreadMessageCountChanged: { __typename?: 'UnreadMessageCount', count: number, userId: string } };


export const UnreadMessageCountChangedDocument = gql`
    subscription UnreadMessageCountChanged($userId: String!) {
  unreadMessageCountChanged(userId: $userId) {
    count
    userId
  }
}
    `;
export function useUnreadMessageCountChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<UnreadMessageCountChangedSubscription, UnreadMessageCountChangedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UnreadMessageCountChangedSubscription, UnreadMessageCountChangedSubscriptionVariables>(UnreadMessageCountChangedDocument, options);
      }
export type UnreadMessageCountChangedSubscriptionHookResult = ReturnType<typeof useUnreadMessageCountChangedSubscription>;
export type UnreadMessageCountChangedSubscriptionResult = Apollo.SubscriptionResult<UnreadMessageCountChangedSubscription>;