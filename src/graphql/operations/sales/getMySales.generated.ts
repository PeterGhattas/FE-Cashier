import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMySalesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMySalesQuery = { __typename?: 'Query', getMySales: Array<{ __typename?: 'Sale', _id: string, amountPaid: number, change: number, createdAt: any, customerEmail?: string | null, customerName?: string | null, customerPhone?: string | null, discount: number, invoiceNumber: string, notes?: string | null, paymentMethod: Types.PaymentMethod, profit: number, refundReason?: string | null, refundedAt?: any | null, refundedBy?: string | null, refundedFromSaleId?: string | null, status: Types.SaleStatus, storeId: string, subtotal: number, tax: number, total: number, totalCost: number, updatedAt: any, userId: string, username: string, items: Array<{ __typename?: 'SaleItem', discount: number, productId: string, productName: string, quantity: number, sku: string, subtotal: number, tax: number, total: number, unitCost: number, unitPrice: number }> }> };


export const GetMySalesDocument = gql`
    query GetMySales {
  getMySales {
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
export function useGetMySalesQuery(baseOptions?: Apollo.QueryHookOptions<GetMySalesQuery, GetMySalesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMySalesQuery, GetMySalesQueryVariables>(GetMySalesDocument, options);
      }
export function useGetMySalesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMySalesQuery, GetMySalesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMySalesQuery, GetMySalesQueryVariables>(GetMySalesDocument, options);
        }
export type GetMySalesQueryHookResult = ReturnType<typeof useGetMySalesQuery>;
export type GetMySalesLazyQueryHookResult = ReturnType<typeof useGetMySalesLazyQuery>;
export type GetMySalesQueryResult = Apollo.QueryResult<GetMySalesQuery, GetMySalesQueryVariables>;