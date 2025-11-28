import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSaleStatusMutationVariables = Types.Exact<{
  input: Types.UpdateSaleStatusInput;
}>;


export type UpdateSaleStatusMutation = { __typename?: 'Mutation', updateSaleStatus: { __typename?: 'Sale', _id: string } };


export const UpdateSaleStatusDocument = gql`
    mutation UpdateSaleStatus($input: UpdateSaleStatusInput!) {
  updateSaleStatus(input: $input) {
    _id
  }
}
    `;
export type UpdateSaleStatusMutationFn = Apollo.MutationFunction<UpdateSaleStatusMutation, UpdateSaleStatusMutationVariables>;
export function useUpdateSaleStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSaleStatusMutation, UpdateSaleStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSaleStatusMutation, UpdateSaleStatusMutationVariables>(UpdateSaleStatusDocument, options);
      }
export type UpdateSaleStatusMutationHookResult = ReturnType<typeof useUpdateSaleStatusMutation>;
export type UpdateSaleStatusMutationResult = Apollo.MutationResult<UpdateSaleStatusMutation>;
export type UpdateSaleStatusMutationOptions = Apollo.BaseMutationOptions<UpdateSaleStatusMutation, UpdateSaleStatusMutationVariables>;