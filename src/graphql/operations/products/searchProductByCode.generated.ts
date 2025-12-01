import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchProductByCodeQueryVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  storeId: Types.Scalars['String']['input'];
}>;


export type SearchProductByCodeQuery = { __typename?: 'Query', searchProductByCode?: { __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any, image?: { __typename?: 'FileType', _id: string, cloudinaryPublicId?: string | null, createdAt: any, description?: string | null, filename: string, format?: string | null, height?: number | null, mimetype: string, originalName: string, path?: string | null, resourceType?: string | null, secureUrl?: string | null, size: number, storageType: Types.StorageType, updatedAt: any, url?: string | null, width?: number | null, uploadedBy: { __typename?: 'UserType', _id: string, address?: string | null, assignedStores: Array<string>, avatar?: string | null, createdAt: any, deviceTokens: Array<string>, email: string, fullName: string, isActive: boolean, lastLogin?: any | null, permissions: Array<string>, phoneNumber: string, role: Types.UserRole, storeId?: string | null, updatedAt: any, username: string } } | null } | null };


export const SearchProductByCodeDocument = gql`
    query SearchProductByCode($code: String!, $storeId: String!) {
  searchProductByCode(code: $code, storeId: $storeId) {
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
export function useSearchProductByCodeQuery(baseOptions: Apollo.QueryHookOptions<SearchProductByCodeQuery, SearchProductByCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProductByCodeQuery, SearchProductByCodeQueryVariables>(SearchProductByCodeDocument, options);
      }
export function useSearchProductByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProductByCodeQuery, SearchProductByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProductByCodeQuery, SearchProductByCodeQueryVariables>(SearchProductByCodeDocument, options);
        }
export type SearchProductByCodeQueryHookResult = ReturnType<typeof useSearchProductByCodeQuery>;
export type SearchProductByCodeLazyQueryHookResult = ReturnType<typeof useSearchProductByCodeLazyQuery>;
export type SearchProductByCodeQueryResult = Apollo.QueryResult<SearchProductByCodeQuery, SearchProductByCodeQueryVariables>;