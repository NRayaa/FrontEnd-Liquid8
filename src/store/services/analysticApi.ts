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
        getAnalyticSalesMonthly: builder.query<any, { from: any; to: any }>({
            query: ({ from, to }) => `/dashboard/monthly-analytic-sales?from=${from}&to=${to}`,
        }),
        getAnalyticSalesYearly: builder.query<any, any>({
            query: (y) => `/dashboard/yearly-analytic-sales?y=${y}`,
        }),
        getGeneralSales: builder.query<any, { from: any; to: any }>({
            query: ({ from, to }) => `/dashboard/general-sales?from=${from}&to=${to}`,
        }),
        exportGenerateExcelStorageReport: builder.query<any, any>({
            query: () => `/generateExcel_StorageReport`,
        }),
        exportMonthlyAnalyticSale: builder.query<any,{ from: any; to: any }>({
            query: ({ from, to}) => `/dashboard/monthly-analytic-sales/export?from=${from}&to=${to}`,
        }),
        exportYearlyAnalyticSale: builder.query<any,any>({
            query: (y) => `/dashboard/yearly-analytic-sales/export?y=${y}`,
        }),
    }),
});

export const { useGetSummaryTransactionQuery, useGetSummarySalesQuery, useGetAnalyticSalesMonthlyQuery, useGetAnalyticSalesYearlyQuery, useGetGeneralSalesQuery, useGetStorageReportQuery, useLazyExportGenerateExcelStorageReportQuery, useLazyExportMonthlyAnalyticSaleQuery, useLazyExportYearlyAnalyticSaleQuery } =
    analyticApi;
