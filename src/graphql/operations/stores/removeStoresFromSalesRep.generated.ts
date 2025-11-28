import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveStoresFromSalesRepMutationVariables = Types.Exact<{
  salesRepId: Types.Scalars['String']['input'];
  storeIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type RemoveStoresFromSalesRepMutation = { __typename?: 'Mutation', removeStoresFromSalesRep: { __typename?: 'UserType', _id: string } };


export const RemoveStoresFromSalesRepDocument = gql`
    mutation RemoveStoresFromSalesRep($salesRepId: String!, $storeIds: [String!]!) {
  removeStoresFromSalesRep(salesRepId: $salesRepId, storeIds: $storeIds) {
    _id
  }
}
    `;
export type RemoveStoresFromSalesRepMutationFn = Apollo.MutationFunction<RemoveStoresFromSalesRepMutation, RemoveStoresFromSalesRepMutationVariables>;
export function useRemoveStoresFromSalesRepMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStoresFromSalesRepMutation, RemoveStoresFromSalesRepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStoresFromSalesRepMutation, RemoveStoresFromSalesRepMutationVariables>(RemoveStoresFromSalesRepDocument, options);
      }
export type RemoveStoresFromSalesRepMutationHookResult = ReturnType<typeof useRemoveStoresFromSalesRepMutation>;
export type RemoveStoresFromSalesRepMutationResult = Apollo.MutationResult<RemoveStoresFromSalesRepMutation>;
export type RemoveStoresFromSalesRepMutationOptions = Apollo.BaseMutationOptions<RemoveStoresFromSalesRepMutation, RemoveStoresFromSalesRepMutationVariables>;