import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTodaySalesQueryVariables = Types.Exact<{
  storeId: Types.Scalars['ID']['input'];
}>;


export type GetTodaySalesQuery = { __typename?: 'Query', getTodaySales: Array<{ __typename?: 'Sale', _id: string, amountPaid: number, change: number, createdAt: any, customerEmail?: string | null, customerName?: string | null, customerPhone?: string | null, discount: number, invoiceNumber: string, notes?: string | null, paymentMethod: Types.PaymentMethod, profit: number, refundReason?: string | null, refundedAt?: any | null, refundedBy?: string | null, refundedFromSaleId?: string | null, status: Types.SaleStatus, storeId: string, subtotal: number, tax: number, total: number, totalCost: number, updatedAt: any, userId: string, username: string, items: Array<{ __typename?: 'SaleItem', discount: number, productId: string, productName: string, quantity: number, sku: string, subtotal: number, tax: number, total: number, unitCost: number, unitPrice: number }> }> };


export const GetTodaySalesDocument = gql`
    query GetTodaySales($storeId: ID!) {
  getTodaySales(storeId: $storeId) {
    _id
    amountPaid
    change
    createdAt
    customerEmail
    customerName
    customerPhone
    discount
    invoiceNumber
    items {
      discount
      productId
      productName
      quantity
      sku
      subtotal
      tax
      total
      unitCost
      unitPrice
    }
    notes
    paymentMethod
    profit
    refundReason
    refundedAt
    refundedBy
    refundedFromSaleId
    status
    storeId
    subtotal
    tax
    total
    totalCost
    updatedAt
    userId
    username
  }
}
    `;
export function useGetTodaySalesQuery(baseOptions: Apollo.QueryHookOptions<GetTodaySalesQuery, GetTodaySalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTodaySalesQuery, GetTodaySalesQueryVariables>(GetTodaySalesDocument, options);
      }
export function useGetTodaySalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodaySalesQuery, GetTodaySalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTodaySalesQuery, GetTodaySalesQueryVariables>(GetTodaySalesDocument, options);
        }
export type GetTodaySalesQueryHookResult = ReturnType<typeof useGetTodaySalesQuery>;
export type GetTodaySalesLazyQueryHookResult = ReturnType<typeof useGetTodaySalesLazyQuery>;
export type GetTodaySalesQueryResult = Apollo.QueryResult<GetTodaySalesQuery, GetTodaySalesQueryVariables>;