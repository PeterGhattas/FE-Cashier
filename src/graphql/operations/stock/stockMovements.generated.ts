import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StockMovementsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StockMovementsQuery = { __typename?: 'Query', stockMovements: Array<{ __typename?: 'StockMovementType', _id: string, createdAt: any, metadata: any, newQuantity: number, notes?: string | null, previousQuantity: number, productId: string, quantity: number, reason?: string | null, referenceId?: string | null, referenceType?: string | null, status: Types.StockMovementStatusEnum, storeId: string, totalCost: number, type: Types.StockMovementTypeEnum, unitCost: number, updatedAt: any, userId: string, username: string }> };


export const StockMovementsDocument = gql`
    query StockMovements {
  stockMovements {
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
export function useStockMovementsQuery(baseOptions?: Apollo.QueryHookOptions<StockMovementsQuery, StockMovementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StockMovementsQuery, StockMovementsQueryVariables>(StockMovementsDocument, options);
      }
export function useStockMovementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StockMovementsQuery, StockMovementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StockMovementsQuery, StockMovementsQueryVariables>(StockMovementsDocument, options);
        }
export type StockMovementsQueryHookResult = ReturnType<typeof useStockMovementsQuery>;
export type StockMovementsLazyQueryHookResult = ReturnType<typeof useStockMovementsLazyQuery>;
export type StockMovementsQueryResult = Apollo.QueryResult<StockMovementsQuery, StockMovementsQueryVariables>;