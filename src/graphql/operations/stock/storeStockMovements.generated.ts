import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StoreStockMovementsQueryVariables = Types.Exact<{
  storeId: Types.Scalars['String']['input'];
}>;


export type StoreStockMovementsQuery = { __typename?: 'Query', storeStockMovements: Array<{ __typename?: 'StockMovementType', _id: string, createdAt: any, metadata: any, newQuantity: number, notes?: string | null, previousQuantity: number, productId: string, quantity: number, reason?: string | null, referenceId?: string | null, referenceType?: string | null, status: Types.StockMovementStatusEnum, storeId: string, totalCost: number, type: Types.StockMovementTypeEnum, unitCost: number, updatedAt: any, userId: string, username: string }> };


export const StoreStockMovementsDocument = gql`
    query StoreStockMovements($storeId: String!) {
  storeStockMovements(storeId: $storeId) {
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
export function useStoreStockMovementsQuery(baseOptions: Apollo.QueryHookOptions<StoreStockMovementsQuery, StoreStockMovementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoreStockMovementsQuery, StoreStockMovementsQueryVariables>(StoreStockMovementsDocument, options);
      }
export function useStoreStockMovementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoreStockMovementsQuery, StoreStockMovementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoreStockMovementsQuery, StoreStockMovementsQueryVariables>(StoreStockMovementsDocument, options);
        }
export type StoreStockMovementsQueryHookResult = ReturnType<typeof useStoreStockMovementsQuery>;
export type StoreStockMovementsLazyQueryHookResult = ReturnType<typeof useStoreStockMovementsLazyQuery>;
export type StoreStockMovementsQueryResult = Apollo.QueryResult<StoreStockMovementsQuery, StoreStockMovementsQueryVariables>;