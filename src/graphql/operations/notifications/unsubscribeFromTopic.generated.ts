import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeFromTopicMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  topic: Types.Scalars['String']['input'];
}>;


export type UnsubscribeFromTopicMutation = { __typename?: 'Mutation', unsubscribeFromTopic: boolean };


export const UnsubscribeFromTopicDocument = gql`
    mutation UnsubscribeFromTopic($token: String!, $topic: String!) {
  unsubscribeFromTopic(token: $token, topic: $topic)
}
    `;
export type UnsubscribeFromTopicMutationFn = Apollo.MutationFunction<UnsubscribeFromTopicMutation, UnsubscribeFromTopicMutationVariables>;
export function useUnsubscribeFromTopicMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeFromTopicMutation, UnsubscribeFromTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeFromTopicMutation, UnsubscribeFromTopicMutationVariables>(UnsubscribeFromTopicDocument, options);
      }
export type UnsubscribeFromTopicMutationHookResult = ReturnType<typeof useUnsubscribeFromTopicMutation>;
export type UnsubscribeFromTopicMutationResult = Apollo.MutationResult<UnsubscribeFromTopicMutation>;
export type UnsubscribeFromTopicMutationOptions = Apollo.BaseMutationOptions<UnsubscribeFromTopicMutation, UnsubscribeFromTopicMutationVariables>;