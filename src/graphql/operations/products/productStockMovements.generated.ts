import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductStockMovementsQueryVariables = Types.Exact<{
  productId: Types.Scalars['String']['input'];
}>;


export type ProductStockMovementsQuery = { __typename?: 'Query', productStockMovements: Array<{ __typename?: 'StockMovementType', _id: string, createdAt: any, metadata: any, newQuantity: number, notes?: string | null, previousQuantity: number, productId: string, quantity: number, reason?: string | null, referenceId?: string | null, referenceType?: string | null, status: Types.StockMovementStatusEnum, storeId: string, totalCost: number, type: Types.StockMovementTypeEnum, unitCost: number, updatedAt: any, userId: string, username: string }> };


export const ProductStockMovementsDocument = gql`
    query ProductStockMovements($productId: String!) {
  productStockMovements(productId: $productId) {
    _id
    createdAt
    metadata
    newQuantity
    notes
    previousQuantity
    productId
    quantity
    reason
    referenceId
    referenceType
    status
    storeId
    totalCost
    type
    unitCost
    updatedAt
    userId
    username
  }
}
    `;
export function useProductStockMovementsQuery(baseOptions: Apollo.QueryHookOptions<ProductStockMovementsQuery, ProductStockMovementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductStockMovementsQuery, ProductStockMovementsQueryVariables>(ProductStockMovementsDocument, options);
      }
export function useProductStockMovementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductStockMovementsQuery, ProductStockMovementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductStockMovementsQuery, ProductStockMovementsQueryVariables>(ProductStockMovementsDocument, options);
        }
export type ProductStockMovementsQueryHookResult = ReturnType<typeof useProductStockMovementsQuery>;
export type ProductStockMovementsLazyQueryHookResult = ReturnType<typeof useProductStockMovementsLazyQuery>;
export type ProductStockMovementsQueryResult = Apollo.QueryResult<ProductStockMovementsQuery, ProductStockMovementsQueryVariables>;