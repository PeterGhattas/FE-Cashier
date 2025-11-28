import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBusinessHoursMutationVariables = Types.Exact<{
  businessHours: Types.Scalars['JSON']['input'];
  storeId: Types.Scalars['String']['input'];
}>;


export type UpdateBusinessHoursMutation = { __typename?: 'Mutation', updateBusinessHours: { __typename?: 'StoreType', _id: string } };


export const UpdateBusinessHoursDocument = gql`
    mutation UpdateBusinessHours($businessHours: JSON!, $storeId: String!) {
  updateBusinessHours(businessHours: $businessHours, storeId: $storeId) {
    _id
  }
}
    `;
export type UpdateBusinessHoursMutationFn = Apollo.MutationFunction<UpdateBusinessHoursMutation, UpdateBusinessHoursMutationVariables>;
export function useUpdateBusinessHoursMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessHoursMutation, UpdateBusinessHoursMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessHoursMutation, UpdateBusinessHoursMutationVariables>(UpdateBusinessHoursDocument, options);
      }
export type UpdateBusinessHoursMutationHookResult = ReturnType<typeof useUpdateBusinessHoursMutation>;
export type UpdateBusinessHoursMutationResult = Apollo.MutationResult<UpdateBusinessHoursMutation>;
export type UpdateBusinessHoursMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessHoursMutation, UpdateBusinessHoursMutationVariables>;