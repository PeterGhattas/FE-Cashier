import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteNotificationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteNotification: boolean };


export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: String!) {
  deleteNotification(id: $id)
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;