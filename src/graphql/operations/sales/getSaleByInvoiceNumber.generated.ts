import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSaleByInvoiceNumberQueryVariables = Types.Exact<{
  invoiceNumber: Types.Scalars['String']['input'];
}>;


export type GetSaleByInvoiceNumberQuery = { __typename?: 'Query', getSaleByInvoiceNumber: { __typename?: 'Sale', _id: string, amountPaid: number, change: number, createdAt: any, customerEmail?: string | null, customerName?: string | null, customerPhone?: string | null, discount: number, invoiceNumber: string, notes?: string | null, paymentMethod: Types.PaymentMethod, profit: number, refundReason?: string | null, refundedAt?: any | null, refundedBy?: string | null, refundedFromSaleId?: string | null, status: Types.SaleStatus, storeId: string, subtotal: number, tax: number, total: number, totalCost: number, updatedAt: any, userId: string, username: string, items: Array<{ __typename?: 'SaleItem', discount: number, productId: string, productName: string, quantity: number, sku: string, subtotal: number, tax: number, total: number, unitCost: number, unitPrice: number }> } };


export const GetSaleByInvoiceNumberDocument = gql`
    query GetSaleByInvoiceNumber($invoiceNumber: String!) {
  getSaleByInvoiceNumber(invoiceNumber: $invoiceNumber) {
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
export function useGetSaleByInvoiceNumberQuery(baseOptions: Apollo.QueryHookOptions<GetSaleByInvoiceNumberQuery, GetSaleByInvoiceNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleByInvoiceNumberQuery, GetSaleByInvoiceNumberQueryVariables>(GetSaleByInvoiceNumberDocument, options);
      }
export function useGetSaleByInvoiceNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleByInvoiceNumberQuery, GetSaleByInvoiceNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleByInvoiceNumberQuery, GetSaleByInvoiceNumberQueryVariables>(GetSaleByInvoiceNumberDocument, options);
        }
export type GetSaleByInvoiceNumberQueryHookResult = ReturnType<typeof useGetSaleByInvoiceNumberQuery>;
export type GetSaleByInvoiceNumberLazyQueryHookResult = ReturnType<typeof useGetSaleByInvoiceNumberLazyQuery>;
export type GetSaleByInvoiceNumberQueryResult = Apollo.QueryResult<GetSaleByInvoiceNumberQuery, GetSaleByInvoiceNumberQueryVariables>;