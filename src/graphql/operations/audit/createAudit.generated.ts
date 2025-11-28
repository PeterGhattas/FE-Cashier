import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAuditMutationVariables = Types.Exact<{
  createAuditInput: Types.CreateAuditInput;
}>;


export type CreateAuditMutation = { __typename?: 'Mutation', createAudit: { __typename?: 'AuditType', _id: string } };


export const CreateAuditDocument = gql`
    mutation CreateAudit($createAuditInput: CreateAuditInput!) {
  createAudit(createAuditInput: $createAuditInput) {
    _id
  }
}
    `;
export type CreateAuditMutationFn = Apollo.MutationFunction<CreateAuditMutation, CreateAuditMutationVariables>;
export function useCreateAuditMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuditMutation, CreateAuditMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuditMutation, CreateAuditMutationVariables>(CreateAuditDocument, options);
      }
export type CreateAuditMutationHookResult = ReturnType<typeof useCreateAuditMutation>;
export type CreateAuditMutationResult = Apollo.MutationResult<CreateAuditMutation>;
export type CreateAuditMutationOptions = Apollo.BaseMutationOptions<CreateAuditMutation, CreateAuditMutationVariables>;