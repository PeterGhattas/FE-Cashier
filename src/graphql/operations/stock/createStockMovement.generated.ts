import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStockMovementMutationVariables = Types.Exact<{
  input: Types.CreateStockMovementInput;
}>;


export type CreateStockMovementMutation = { __typename?: 'Mutation', createStockMovement: { __typename?: 'StockMovementType', _id: string } };


export const CreateStockMovementDocument = gql`
    mutation CreateStockMovement($input: CreateStockMovementInput!) {
  createStockMovement(input: $input) {
    _id
  }
}
    `;
export type CreateStockMovementMutationFn = Apollo.MutationFunction<CreateStockMovementMutation, CreateStockMovementMutationVariables>;
export function useCreateStockMovementMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockMovementMutation, CreateStockMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockMovementMutation, CreateStockMovementMutationVariables>(CreateStockMovementDocument, options);
      }
export type CreateStockMovementMutationHookResult = ReturnType<typeof useCreateStockMovementMutation>;
export type CreateStockMovementMutationResult = Apollo.MutationResult<CreateStockMovementMutation>;
export type CreateStockMovementMutationOptions = Apollo.BaseMutationOptions<CreateStockMovementMutation, CreateStockMovementMutationVariables>;