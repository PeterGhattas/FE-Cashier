import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNextInvoiceNumberMutationVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type GetNextInvoiceNumberMutation = { __typename?: 'Mutation', getNextInvoiceNumber: string };


export const GetNextInvoiceNumberDocument = gql`
    mutation GetNextInvoiceNumber($storeId: String!) {
  getNextInvoiceNumber(storeId: $storeId)
}
    `;
export type GetNextInvoiceNumberMutationFn = Apollo.MutationFunction<GetNextInvoiceNumberMutation, GetNextInvoiceNumberMutationVariables>;
export function useGetNextInvoiceNumberMutation(baseOptions?: Apollo.MutationHookOptions<GetNextInvoiceNumberMutation, GetNextInvoiceNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetNextInvoiceNumberMutation, GetNextInvoiceNumberMutationVariables>(GetNextInvoiceNumberDocument, options);
      }
export type GetNextInvoiceNumberMutationHookResult = ReturnType<typeof useGetNextInvoiceNumberMutation>;
export type GetNextInvoiceNumberMutationResult = Apollo.MutationResult<GetNextInvoiceNumberMutation>;
export type GetNextInvoiceNumberMutationOptions = Apollo.BaseMutationOptions<GetNextInvoiceNumberMutation, GetNextInvoiceNumberMutationVariables>;