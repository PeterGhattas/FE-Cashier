import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AssignStoresToSalesRepMutationVariables = Types.Exact<{
  salesRepId: Types.Scalars['String']['input'];
  storeIds: Array<Types.Scalars['String']['input']> | Types.Scalars['String']['input'];
}>;


export type AssignStoresToSalesRepMutation = { __typename?: 'Mutation', assignStoresToSalesRep: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } };


export const AssignStoresToSalesRepDocument = gql`
    mutation AssignStoresToSalesRep($salesRepId: String!, $storeIds: [String!]!) {
  assignStoresToSalesRep(salesRepId: $salesRepId, storeIds: $storeIds) {
    _id
    address
    assignedStores
    avatar
    createdAt
    deviceTokens
    email
    fullName
    isActive
    lastLogin
    permissions
    phoneNumber
    role
    storeId
    updatedAt
    username
  }
}
    `;
export type AssignStoresToSalesRepMutationFn = Apollo.MutationFunction<AssignStoresToSalesRepMutation, AssignStoresToSalesRepMutationVariables>;
export function useAssignStoresToSalesRepMutation(baseOptions?: Apollo.MutationHookOptions<AssignStoresToSalesRepMutation, AssignStoresToSalesRepMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignStoresToSalesRepMutation, AssignStoresToSalesRepMutationVariables>(AssignStoresToSalesRepDocument, options);
      }
export type AssignStoresToSalesRepMutationHookResult = ReturnType<typeof useAssignStoresToSalesRepMutation>;
export type AssignStoresToSalesRepMutationResult = Apollo.MutationResult<AssignStoresToSalesRepMutation>;
export type AssignStoresToSalesRepMutationOptions = Apollo.BaseMutationOptions<AssignStoresToSalesRepMutation, AssignStoresToSalesRepMutationVariables>;