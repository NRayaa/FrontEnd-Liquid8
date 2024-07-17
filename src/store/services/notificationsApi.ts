import { createApi } from '@reduxjs/toolkit/query/react';
import { GetNotifByRole, SpvAprroval } from './types';
import { baseQuery } from './prepareHeader';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getNotifByRole: builder.query<GetNotifByRole, { page: number; query: string }>({
            query: ({ page, query }) => `/notificationByRole?page=${page}&q=${query === 'all' ? '' : query}`,
        }),
        spvApproval: builder.query<SpvAprroval, number>({
            query: (id) => `/spv/approve/${id}`,
        }),
        wifiIndikator: builder.query<any, any>({
            query: () => `/cek-ping-with-image`,
        }),
    }),
});

export const { useGetNotifByRoleQuery, useLazyGetNotifByRoleQuery, useLazySpvApprovalQuery, useWifiIndikatorQuery } = notificationsApi;
