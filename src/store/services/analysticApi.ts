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
        // new
        getStorageReport: builder.query<any, any>({
            query: () => `/dashboard/storage-report`,
        }),
        getAnalyticSales: builder.query<any, { from: any; to: any }>({
            query: ({ from, to }) => `/dashboard/analytic-sales?from=${from}&to=${to}`,
        }),
        getGeneralSales: builder.query<any, { from: any; to: any }>({
            query: ({ from, to }) => `/dashboard/general-sales?from=${from}&to=${to}`,
        }),
    }),
});

export const { useGetSummaryTransactionQuery, useGetSummarySalesQuery, useGetAnalyticSalesQuery, useGetGeneralSalesQuery, useGetStorageReportQuery } = analyticApi;
