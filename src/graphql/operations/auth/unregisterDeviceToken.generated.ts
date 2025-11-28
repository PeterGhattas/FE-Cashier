import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnregisterDeviceTokenMutationVariables = Types.Exact<{
  token: Types.Scalars['String']['input'];
}>;


export type UnregisterDeviceTokenMutation = { __typename?: 'Mutation', unregisterDeviceToken: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } };


export const UnregisterDeviceTokenDocument = gql`
    mutation UnregisterDeviceToken($token: String!) {
  unregisterDeviceToken(token: $token) {
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
export type UnregisterDeviceTokenMutationFn = Apollo.MutationFunction<UnregisterDeviceTokenMutation, UnregisterDeviceTokenMutationVariables>;
export function useUnregisterDeviceTokenMutation(baseOptions?: Apollo.MutationHookOptions<UnregisterDeviceTokenMutation, UnregisterDeviceTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnregisterDeviceTokenMutation, UnregisterDeviceTokenMutationVariables>(UnregisterDeviceTokenDocument, options);
      }
export type UnregisterDeviceTokenMutationHookResult = ReturnType<typeof useUnregisterDeviceTokenMutation>;
export type UnregisterDeviceTokenMutationResult = Apollo.MutationResult<UnregisterDeviceTokenMutation>;
export type UnregisterDeviceTokenMutationOptions = Apollo.BaseMutationOptions<UnregisterDeviceTokenMutation, UnregisterDeviceTokenMutationVariables>;