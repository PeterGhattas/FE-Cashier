import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserStatusMutationVariables = Types.Exact<{
  input: Types.UpdateStatusInput;
}>;


export type UpdateUserStatusMutation = { __typename?: 'Mutation', updateUserStatus: { __typename?: 'Presence', _id: string } };


export const UpdateUserStatusDocument = gql`
    mutation UpdateUserStatus($input: UpdateStatusInput!) {
  updateUserStatus(input: $input) {
    _id
  }
}
    `;
export type UpdateUserStatusMutationFn = Apollo.MutationFunction<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;
export function useUpdateUserStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>(UpdateUserStatusDocument, options);
      }
export type UpdateUserStatusMutationHookResult = ReturnType<typeof useUpdateUserStatusMutation>;
export type UpdateUserStatusMutationResult = Apollo.MutationResult<UpdateUserStatusMutation>;
export type UpdateUserStatusMutationOptions = Apollo.BaseMutationOptions<UpdateUserStatusMutation, UpdateUserStatusMutationVariables>;