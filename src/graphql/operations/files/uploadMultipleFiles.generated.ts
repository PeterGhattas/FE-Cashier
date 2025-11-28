import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UploadMultipleFilesMutationVariables = Types.Exact<{
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  files: Array<Types.Scalars['Upload']['input']> | Types.Scalars['Upload']['input'];
}>;


export type UploadMultipleFilesMutation = { __typename?: 'Mutation', uploadMultipleFiles: Array<{ __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } }> };


export const UploadMultipleFilesDocument = gql`
    mutation UploadMultipleFiles($description: String, $files: [Upload!]!) {
  uploadMultipleFiles(description: $description, files: $files) {
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
export type UploadMultipleFilesMutationFn = Apollo.MutationFunction<UploadMultipleFilesMutation, UploadMultipleFilesMutationVariables>;
export function useUploadMultipleFilesMutation(baseOptions?: Apollo.MutationHookOptions<UploadMultipleFilesMutation, UploadMultipleFilesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMultipleFilesMutation, UploadMultipleFilesMutationVariables>(UploadMultipleFilesDocument, options);
      }
export type UploadMultipleFilesMutationHookResult = ReturnType<typeof useUploadMultipleFilesMutation>;
export type UploadMultipleFilesMutationResult = Apollo.MutationResult<UploadMultipleFilesMutation>;
export type UploadMultipleFilesMutationOptions = Apollo.BaseMutationOptions<UploadMultipleFilesMutation, UploadMultipleFilesMutationVariables>;