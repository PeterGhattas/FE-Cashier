import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserTypingSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['String']['input'];
}>;


export type UserTypingSubscription = { __typename?: 'Subscription', userTyping: { __typename?: 'TypingStatus', chatWithUserId: string, isTyping: boolean, userId: string } };


export const UserTypingDocument = gql`
    subscription UserTyping($userId: String!) {
  userTyping(userId: $userId) {
    chatWithUserId
    isTyping
    userId
  }
}
    `;
export function useUserTypingSubscription(baseOptions: Apollo.SubscriptionHookOptions<UserTypingSubscription, UserTypingSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserTypingSubscription, UserTypingSubscriptionVariables>(UserTypingDocument, options);
      }
export type UserTypingSubscriptionHookResult = ReturnType<typeof useUserTypingSubscription>;
export type UserTypingSubscriptionResult = Apollo.SubscriptionResult<UserTypingSubscription>;