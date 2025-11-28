import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestockProductMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  quantity: Types.Scalars['Int']['input'];
}>;


export type RestockProductMutation = { __typename?: 'Mutation', restockProduct: { __typename?: 'ProductType', _id: string, allowBackorder: boolean, barcode?: string | null, brand?: string | null, category?: string | null, cost: number, createdAt: any, description?: string | null, image?: string | null, images: Array<string>, lastSoldAt?: any | null, metadata: any, minStockLevel: number, name: string, price: number, quantity: number, reorderPoint: number, reorderQuantity: number, revenue: number, sku: string, status: Types.ProductStatus, storeId: string, supplier?: string | null, tags: Array<string>, taxable: boolean, totalSold: number, trackInventory: boolean, unit: Types.ProductUnit, updatedAt: any } };


export const RestockProductDocument = gql`
    mutation RestockProduct($id: String!, $quantity: Int!) {
  restockProduct(id: $id, quantity: $quantity) {
    _id
    allowBackorder
    barcode
    brand
    category
    cost
    createdAt
    description
    image
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
export type RestockProductMutationFn = Apollo.MutationFunction<RestockProductMutation, RestockProductMutationVariables>;
export function useRestockProductMutation(baseOptions?: Apollo.MutationHookOptions<RestockProductMutation, RestockProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestockProductMutation, RestockProductMutationVariables>(RestockProductDocument, options);
      }
export type RestockProductMutationHookResult = ReturnType<typeof useRestockProductMutation>;
export type RestockProductMutationResult = Apollo.MutationResult<RestockProductMutation>;
export type RestockProductMutationOptions = Apollo.BaseMutationOptions<RestockProductMutation, RestockProductMutationVariables>;