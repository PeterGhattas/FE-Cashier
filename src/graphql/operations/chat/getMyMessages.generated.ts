import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyMessagesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyMessagesQuery = { __typename?: 'Query', getMyMessages: Array<{ __typename?: 'Chat', _id: string, createdAt: any, fileId?: string | null, isRead: boolean, message: string, receiverId: string, senderId: string, type: Types.MessageType, updatedAt: any, file?: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } | null }> };


export const GetMyMessagesDocument = gql`
    query GetMyMessages {
  getMyMessages {
    _id
    createdAt
    file {
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
    fileId
    isRead
    message
    receiverId
    senderId
    type
    updatedAt
  }
}
    `;
export function useGetMyMessagesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyMessagesQuery, GetMyMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyMessagesQuery, GetMyMessagesQueryVariables>(GetMyMessagesDocument, options);
      }
export function useGetMyMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyMessagesQuery, GetMyMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyMessagesQuery, GetMyMessagesQueryVariables>(GetMyMessagesDocument, options);
        }
export type GetMyMessagesQueryHookResult = ReturnType<typeof useGetMyMessagesQuery>;
export type GetMyMessagesLazyQueryHookResult = ReturnType<typeof useGetMyMessagesLazyQuery>;
export type GetMyMessagesQueryResult = Apollo.QueryResult<GetMyMessagesQuery, GetMyMessagesQueryVariables>;