import * as Types from '@/graphql/generated/schema';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNotificationMutationVariables = Types.Exact<{
  id: Types.Scalars['String']['input'];
  input: Types.UpdateNotificationInput;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotification: { __typename?: 'Notification', _id: string } };


export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($id: String!, $input: UpdateNotificationInput!) {
  updateNotification(id: $id, input: $input) {
    _id
  }
}
    `;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;