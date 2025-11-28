import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteStoreMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteStoreMutation = { __typename?: 'Mutation', deleteStore: { __typename?: 'StoreType', _id: string } };


export const DeleteStoreDocument = gql`
    mutation DeleteStore($id: String!) {
  deleteStore(id: $id) {
    _id
  }
}
    `;
export type DeleteStoreMutationFn = Apollo.MutationFunction<DeleteStoreMutation, DeleteStoreMutationVariables>;
export function useDeleteStoreMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoreMutation, DeleteStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStoreMutation, DeleteStoreMutationVariables>(DeleteStoreDocument, options);
      }
export type DeleteStoreMutationHookResult = ReturnType<typeof useDeleteStoreMutation>;
export type DeleteStoreMutationResult = Apollo.MutationResult<DeleteStoreMutation>;
export type DeleteStoreMutationOptions = Apollo.BaseMutationOptions<DeleteStoreMutation, DeleteStoreMutationVariables>;