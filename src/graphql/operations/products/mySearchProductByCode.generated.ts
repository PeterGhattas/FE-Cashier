import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MySearchProductByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
}>;


export type MySearchProductByCodeQuery = { __typename?: 'Query', mySearchProductByCode?: { __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any, image?: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } | null } | null };


export const MySearchProductByCodeDocument = gql`
    query MySearchProductByCode($code: String!) {
  mySearchProductByCode(code: $code) {
    _id
    allowBackorder
    barcode
    brand
    category
    cost
    createdAt
    description
    image {
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
    images
    lastSoldAt
    metadata
    minStockLevel
    name
    price
    quantity
    reorderPoint
    reorderQuantity
    revenue
    sku
    status
    storeId
    supplier
    tags
    taxable
    totalSold
    trackInventory
    unit
    updatedAt
  }
}
    `;
export function useMySearchProductByCodeQuery(baseOptions: Apollo.QueryHookOptions<MySearchProductByCodeQuery, MySearchProductByCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MySearchProductByCodeQuery, MySearchProductByCodeQueryVariables>(MySearchProductByCodeDocument, options);
      }
export function useMySearchProductByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MySearchProductByCodeQuery, MySearchProductByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MySearchProductByCodeQuery, MySearchProductByCodeQueryVariables>(MySearchProductByCodeDocument, options);
        }
export type MySearchProductByCodeQueryHookResult = ReturnType<typeof useMySearchProductByCodeQuery>;
export type MySearchProductByCodeLazyQueryHookResult = ReturnType<typeof useMySearchProductByCodeLazyQuery>;
export type MySearchProductByCodeQueryResult = Apollo.QueryResult<MySearchProductByCodeQuery, MySearchProductByCodeQueryVariables>;