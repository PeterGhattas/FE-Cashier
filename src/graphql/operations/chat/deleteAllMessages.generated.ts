import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAllMessagesMutationVariables = Types.Exact<{
  otherUserId?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DeleteAllMessagesMutation = { __typename?: 'Mutation', deleteAllMessages: number };


export const DeleteAllMessagesDocument = gql`
    mutation DeleteAllMessages($otherUserId: String) {
  deleteAllMessages(otherUserId: $otherUserId)
}
    `;
export type DeleteAllMessagesMutationFn = Apollo.MutationFunction<DeleteAllMessagesMutation, DeleteAllMessagesMutationVariables>;
export function useDeleteAllMessagesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAllMessagesMutation, DeleteAllMessagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAllMessagesMutation, DeleteAllMessagesMutationVariables>(DeleteAllMessagesDocument, options);
      }
export type DeleteAllMessagesMutationHookResult = ReturnType<typeof useDeleteAllMessagesMutation>;
export type DeleteAllMessagesMutationResult = Apollo.MutationResult<DeleteAllMessagesMutation>;
export type DeleteAllMessagesMutationOptions = Apollo.BaseMutationOptions<DeleteAllMessagesMutation, DeleteAllMessagesMutationVariables>;