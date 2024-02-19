import { createApi } from '@reduxjs/toolkit/query/react';
import { GetNotifByRole, SpvAprroval } from './types';
import { baseQuery } from './prepareHeader';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getNotifByRole: builder.query<GetNotifByRole, undefined>({
            query: () => '/notificationByRole',
        }),
        spvApproval: builder.query<SpvAprroval, number>({
            query: (id) => `/spv/approve/${id}`,
        }),
    }),
});

export const { useGetNotifByRoleQuery, useLazyGetNotifByRoleQuery, useLazySpvApprovalQuery } = notificationsApi;
