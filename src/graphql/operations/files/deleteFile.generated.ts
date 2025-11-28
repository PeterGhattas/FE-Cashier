import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteFileMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile: boolean };


export const DeleteFileDocument = gql`
    mutation DeleteFile($id: String!) {
  deleteFile(id: $id)
}
    `;
export type DeleteFileMutationFn = Apollo.MutationFunction<DeleteFileMutation, DeleteFileMutationVariables>;
export function useDeleteFileMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFileMutation, DeleteFileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, options);
      }
export type DeleteFileMutationHookResult = ReturnType<typeof useDeleteFileMutation>;
export type DeleteFileMutationResult = Apollo.MutationResult<DeleteFileMutation>;
export type DeleteFileMutationOptions = Apollo.BaseMutationOptions<DeleteFileMutation, DeleteFileMutationVariables>;