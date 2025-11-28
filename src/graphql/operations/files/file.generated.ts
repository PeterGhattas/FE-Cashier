import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FileQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type FileQuery = { __typename?: 'Query', file: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } };


export const FileDocument = gql`
    query File($id: String!) {
  file(id: $id) {
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
export function useFileQuery(baseOptions: Apollo.QueryHookOptions<FileQuery, FileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FileQuery, FileQueryVariables>(FileDocument, options);
      }
export function useFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FileQuery, FileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FileQuery, FileQueryVariables>(FileDocument, options);
        }
export type FileQueryHookResult = ReturnType<typeof useFileQuery>;
export type FileLazyQueryHookResult = ReturnType<typeof useFileLazyQuery>;
export type FileQueryResult = Apollo.QueryResult<FileQuery, FileQueryVariables>;