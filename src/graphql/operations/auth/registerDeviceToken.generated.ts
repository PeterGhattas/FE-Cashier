import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RegisterDeviceTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type RegisterDeviceTokenMutation = { __typename?: 'Mutation', registerDeviceToken: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } };


export const RegisterDeviceTokenDocument = gql`
    mutation RegisterDeviceToken($token: String!) {
  registerDeviceToken(token: $token) {
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
export type RegisterDeviceTokenMutationFn = Apollo.MutationFunction<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;
export function useRegisterDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>(RegisterDeviceTokenDocument, options);
      }
export type RegisterDeviceTokenMutationHookResult = ReturnType<typeof useRegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationResult = Apollo.MutationResult<RegisterDeviceTokenMutation>;
export type RegisterDeviceTokenMutationOptions = Apollo.BaseMutationOptions<RegisterDeviceTokenMutation, RegisterDeviceTokenMutationVariables>;