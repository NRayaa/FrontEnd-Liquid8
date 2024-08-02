import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';

export const analyticApi = createApi({
    reducerPath: 'analyticApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetSummaryTransaction: builder.query<any, any>({
            query: (y) => `/dashboard/summary-transaction?y=${y}`,
        }),
        GetSummarySales: builder.query<any, { m: any; y: any }>({
            query: ({ m, y }) => `/dashboard/summary-sales?m=${m}&y=${y}`,
        }),
    }),
});

export const { useGetSummaryTransactionQuery, useGetSummarySalesQuery } = analyticApi;
