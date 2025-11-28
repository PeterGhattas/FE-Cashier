import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetTypingMutationVariables = Types.Exact<{
  input: Types.TypingIndicatorInput;
}>;


export type SetTypingMutation = { __typename?: 'Mutation', setTyping: { __typename?: 'TypingStatus', chatWithUserId: string, isTyping: boolean, userId: string } };


export const SetTypingDocument = gql`
    mutation SetTyping($input: TypingIndicatorInput!) {
  setTyping(input: $input) {
    chatWithUserId
    isTyping
    userId
  }
}
    `;
export type SetTypingMutationFn = Apollo.MutationFunction<SetTypingMutation, SetTypingMutationVariables>;
export function useSetTypingMutation(baseOptions?: Apollo.MutationHookOptions<SetTypingMutation, SetTypingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTypingMutation, SetTypingMutationVariables>(SetTypingDocument, options);
      }
export type SetTypingMutationHookResult = ReturnType<typeof useSetTypingMutation>;
export type SetTypingMutationResult = Apollo.MutationResult<SetTypingMutation>;
export type SetTypingMutationOptions = Apollo.BaseMutationOptions<SetTypingMutation, SetTypingMutationVariables>;