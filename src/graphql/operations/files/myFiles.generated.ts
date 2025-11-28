import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyFilesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyFilesQuery = { __typename?: 'Query', myFiles: Array<{ __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } }> };


export const MyFilesDocument = gql`
    query MyFiles {
  myFiles {
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
export function useMyFilesQuery(baseOptions?: Apollo.QueryHookOptions<MyFilesQuery, MyFilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyFilesQuery, MyFilesQueryVariables>(MyFilesDocument, options);
      }
export function useMyFilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyFilesQuery, MyFilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyFilesQuery, MyFilesQueryVariables>(MyFilesDocument, options);
        }
export type MyFilesQueryHookResult = ReturnType<typeof useMyFilesQuery>;
export type MyFilesLazyQueryHookResult = ReturnType<typeof useMyFilesLazyQuery>;
export type MyFilesQueryResult = Apollo.QueryResult<MyFilesQuery, MyFilesQueryVariables>;