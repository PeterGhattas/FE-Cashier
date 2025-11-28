import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSaleMutationVariables = Types.Exact<{
  input: Types.CreateSaleInput;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', _id: string } };


export const CreateSaleDocument = gql`
    mutation CreateSale($input: CreateSaleInput!) {
  createSale(input: $input) {
    _id
  }
}
    `;
export type CreateSaleMutationFn = Apollo.MutationFunction<CreateSaleMutation, CreateSaleMutationVariables>;
export function useCreateSaleMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleMutation, CreateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleMutation, CreateSaleMutationVariables>(CreateSaleDocument, options);
      }
export type CreateSaleMutationHookResult = ReturnType<typeof useCreateSaleMutation>;
export type CreateSaleMutationResult = Apollo.MutationResult<CreateSaleMutation>;
export type CreateSaleMutationOptions = Apollo.BaseMutationOptions<CreateSaleMutation, CreateSaleMutationVariables>;