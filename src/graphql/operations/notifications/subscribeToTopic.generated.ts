import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToTopicMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
  topic: Types.Scalars['String']['input'];
}>;


export type SubscribeToTopicMutation = { __typename?: 'Mutation', subscribeToTopic: boolean };


export const SubscribeToTopicDocument = gql`
    mutation SubscribeToTopic($token: String!, $topic: String!) {
  subscribeToTopic(token: $token, topic: $topic)
}
    `;
export type SubscribeToTopicMutationFn = Apollo.MutationFunction<SubscribeToTopicMutation, SubscribeToTopicMutationVariables>;
export function useSubscribeToTopicMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeToTopicMutation, SubscribeToTopicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeToTopicMutation, SubscribeToTopicMutationVariables>(SubscribeToTopicDocument, options);
      }
export type SubscribeToTopicMutationHookResult = ReturnType<typeof useSubscribeToTopicMutation>;
export type SubscribeToTopicMutationResult = Apollo.MutationResult<SubscribeToTopicMutation>;
export type SubscribeToTopicMutationOptions = Apollo.BaseMutationOptions<SubscribeToTopicMutation, SubscribeToTopicMutationVariables>;