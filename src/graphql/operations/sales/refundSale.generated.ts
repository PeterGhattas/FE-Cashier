import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefundSaleMutationVariables = Types.Exact<{
  input: Types.RefundSaleInput;
}>;


export type RefundSaleMutation = { __typename?: 'Mutation', refundSale: { __typename?: 'Sale', _id: string, amountPaid: number, change: number, createdAt: any, customerEmail?: string | null, customerName?: string | null, customerPhone?: string | null, discount: number, invoiceNumber: string, notes?: string | null, paymentMethod: Types.PaymentMethod, profit: number, refundReason?: string | null, refundedAt?: any | null, refundedBy?: string | null, refundedFromSaleId?: string | null, status: Types.SaleStatus, storeId: string, subtotal: number, tax: number, total: number, totalCost: number, updatedAt: any, userId: string, username: string, items: Array<{ __typename?: 'SaleItem', discount: number, productId: string, productName: string, quantity: number, sku: string, subtotal: number, tax: number, total: number, unitCost: number, unitPrice: number }> } };


export const RefundSaleDocument = gql`
    mutation RefundSale($input: RefundSaleInput!) {
  refundSale(input: $input) {
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
export type RefundSaleMutationFn = Apollo.MutationFunction<RefundSaleMutation, RefundSaleMutationVariables>;
export function useRefundSaleMutation(baseOptions?: Apollo.MutationHookOptions<RefundSaleMutation, RefundSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefundSaleMutation, RefundSaleMutationVariables>(RefundSaleDocument, options);
      }
export type RefundSaleMutationHookResult = ReturnType<typeof useRefundSaleMutation>;
export type RefundSaleMutationResult = Apollo.MutationResult<RefundSaleMutation>;
export type RefundSaleMutationOptions = Apollo.BaseMutationOptions<RefundSaleMutation, RefundSaleMutationVariables>;