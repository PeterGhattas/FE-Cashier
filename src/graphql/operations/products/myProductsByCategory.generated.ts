import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MyProductsByCategoryQueryVariables = Types.Exact<{
  category: Types.Scalars['String']['input'];
}>;


export type MyProductsByCategoryQuery = { __typename?: 'Query', myProductsByCategory: Array<{ __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any, image?: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } | null }> };


export const MyProductsByCategoryDocument = gql`
    query MyProductsByCategory($category: String!) {
  myProductsByCategory(category: $category) {
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
export function useMyProductsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<MyProductsByCategoryQuery, MyProductsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProductsByCategoryQuery, MyProductsByCategoryQueryVariables>(MyProductsByCategoryDocument, options);
      }
export function useMyProductsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProductsByCategoryQuery, MyProductsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProductsByCategoryQuery, MyProductsByCategoryQueryVariables>(MyProductsByCategoryDocument, options);
        }
export type MyProductsByCategoryQueryHookResult = ReturnType<typeof useMyProductsByCategoryQuery>;
export type MyProductsByCategoryLazyQueryHookResult = ReturnType<typeof useMyProductsByCategoryLazyQuery>;
export type MyProductsByCategoryQueryResult = Apollo.QueryResult<MyProductsByCategoryQuery, MyProductsByCategoryQueryVariables>;