import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFileDescriptionMutationVariables = Types.Exact<{
  description: Types.Scalars['String']['input'];
  id: Types.Scalars['String']['input'];
}>;


export type UpdateFileDescriptionMutation = { __typename?: 'Mutation', updateFileDescription: { __typename?: 'FileType', _id: string } };


export const UpdateFileDescriptionDocument = gql`
    mutation UpdateFileDescription($description: String!, $id: String!) {
  updateFileDescription(description: $description, id: $id) {
    _id
  }
}
    `;
export type UpdateFileDescriptionMutationFn = Apollo.MutationFunction<UpdateFileDescriptionMutation, UpdateFileDescriptionMutationVariables>;
export function useUpdateFileDescriptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFileDescriptionMutation, UpdateFileDescriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFileDescriptionMutation, UpdateFileDescriptionMutationVariables>(UpdateFileDescriptionDocument, options);
      }
export type UpdateFileDescriptionMutationHookResult = ReturnType<typeof useUpdateFileDescriptionMutation>;
export type UpdateFileDescriptionMutationResult = Apollo.MutationResult<UpdateFileDescriptionMutation>;
export type UpdateFileDescriptionMutationOptions = Apollo.BaseMutationOptions<UpdateFileDescriptionMutation, UpdateFileDescriptionMutationVariables>;