import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AllFilesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllFilesQuery = { __typename?: 'Query', allFiles: Array<{ __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } }> };


export const AllFilesDocument = gql`
    query AllFiles {
  allFiles {
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
export function useAllFilesQuery(baseOptions?: Apollo.QueryHookOptions<AllFilesQuery, AllFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFilesQuery, AllFilesQueryVariables>(AllFilesDocument, options);
      }
export function useAllFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFilesQuery, AllFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFilesQuery, AllFilesQueryVariables>(AllFilesDocument, options);
        }
export type AllFilesQueryHookResult = ReturnType<typeof useAllFilesQuery>;
export type AllFilesLazyQueryHookResult = ReturnType<typeof useAllFilesLazyQuery>;
export type AllFilesQueryResult = Apollo.QueryResult<AllFilesQuery, AllFilesQueryVariables>;