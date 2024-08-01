import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';

export const analyticApi = createApi({
    reducerPath: 'analyticApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetSummaryTransaction: builder.query<any, any>({
            query: () => '/dashboard/summary-transaction',
        }),
        GetSummarySales: builder.query<any, any>({
            query: () => '/dashboard/summary-sales',
        }),
    }),
});

export const { useGetSummaryTransactionQuery, useGetSummarySalesQuery } = analyticApi;
