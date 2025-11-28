import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStoreMutationVariables = Types.Exact<{
  createStoreInput: Types.CreateStoreInput;
}>;


export type CreateStoreMutation = { __typename?: 'Mutation', createStore: { __typename?: 'StoreType', _id: string } };


export const CreateStoreDocument = gql`
    mutation CreateStore($createStoreInput: CreateStoreInput!) {
  createStore(createStoreInput: $createStoreInput) {
    _id
  }
}
    `;
export type CreateStoreMutationFn = Apollo.MutationFunction<CreateStoreMutation, CreateStoreMutationVariables>;
export function useCreateStoreMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoreMutation, CreateStoreMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoreMutation, CreateStoreMutationVariables>(CreateStoreDocument, options);
      }
export type CreateStoreMutationHookResult = ReturnType<typeof useCreateStoreMutation>;
export type CreateStoreMutationResult = Apollo.MutationResult<CreateStoreMutation>;
export type CreateStoreMutationOptions = Apollo.BaseMutationOptions<CreateStoreMutation, CreateStoreMutationVariables>;