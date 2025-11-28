import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadFileMutationVariables = Types.Exact<{
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  file: Types.Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } };


export const UploadFileDocument = gql`
    mutation UploadFile($description: String, $file: Upload!) {
  uploadFile(description: $description, file: $file) {
    _id
    cloudinaryPublicId
    createdAt
    description
    filename
    format
    height
    mimetype
    originalName
    path
    resourceType
    secureUrl
    size
    storageType
    updatedAt
    uploadedBy {
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
    url
    width
  }
}
    `;
export type UploadFileMutationFn = Apollo.MutationFunction<UploadFileMutation, UploadFileMutationVariables>;
export function useUploadFileMutation(baseOptions?: Apollo.MutationHookOptions<UploadFileMutation, UploadFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
      }
export type UploadFileMutationHookResult = ReturnType<typeof useUploadFileMutation>;
export type UploadFileMutationResult = Apollo.MutationResult<UploadFileMutation>;
export type UploadFileMutationOptions = Apollo.BaseMutationOptions<UploadFileMutation, UploadFileMutationVariables>;