import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStoreMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  updateStoreInput: Types.UpdateStoreInput;
}>;


export type UpdateStoreMutation = { __typename?: 'Mutation', updateStore: { __typename?: 'StoreType', _id: string } };


export const UpdateStoreDocument = gql`
    mutation UpdateStore($id: String!, $updateStoreInput: UpdateStoreInput!) {
  updateStore(id: $id, updateStoreInput: $updateStoreInput) {
    _id
  }
}
    `;
export type UpdateStoreMutationFn = Apollo.MutationFunction<UpdateStoreMutation, UpdateStoreMutationVariables>;
export function useUpdateStoreMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoreMutation, UpdateStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoreMutation, UpdateStoreMutationVariables>(UpdateStoreDocument, options);
      }
export type UpdateStoreMutationHookResult = ReturnType<typeof useUpdateStoreMutation>;
export type UpdateStoreMutationResult = Apollo.MutationResult<UpdateStoreMutation>;
export type UpdateStoreMutationOptions = Apollo.BaseMutationOptions<UpdateStoreMutation, UpdateStoreMutationVariables>;