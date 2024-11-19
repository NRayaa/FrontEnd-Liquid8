import { createApi } from '@reduxjs/toolkit/query/react';
import { CheckAllProducts, DetailGetRiwayatcheck, GetRiwayatcheck, ExportToExcel, GetCheckProduk } from './types';
import { baseQuery } from './prepareHeader';

export const riwayatApi = createApi({
    reducerPath: 'riwayatApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        checkAllDocument: builder.mutation<CheckAllProducts, { code_document: string }>({
            query: (body) => ({
                url: '/historys',
                method: 'POST',
                body,
            }),
        }),
        getRiwayatChecks: builder.query<GetRiwayatcheck, { page: number; search: string }>({
            query: ({ page, search }) => `/historys?page=${page}&q=${search}`,
        }),
        getDetailRiwayatCheck: builder.query<DetailGetRiwayatcheck, number | undefined | string>({
            query: (id) => `/historys/${id}`,
        }),
        deleteRiwayatCheck: builder.mutation<any, any>({
            query: (id) => ({
                url: `/historys/${id}`,
                method: 'DELETE',
            }),
        }),
        exportToExcel: builder.mutation<ExportToExcel, any>({
            query: (body) => ({
                url: '/history/exportToExcel',
                method: 'POST',
                body,
            }),
        }),
        getProductLolos: builder.query<GetCheckProduk, { code_document: string, page: number; search: string }>({
            query: ({ code_document, page, search }) => `/getProductLolos/${code_document}?page=${page}&q=${search}`,
        }),
        getProductDamaged: builder.query<GetCheckProduk, { code_document: string, page: number; search: string }>({
            query: ({ code_document, page, search }) => `/getProductDamaged/${code_document}?page=${page}&q=${search}`,
        }),
        getProductAbnormal: builder.query<GetCheckProduk, { code_document: string, page: number; search: string }>({
            query: ({ code_document, page, search }) => `/getProductAbnormal/${code_document}?page=${page}&q=${search}`,
        }),
        discrepancy: builder.query<GetCheckProduk, { code_document: string, page: number; search: string }>({
            query: ({ code_document, page, search }) => `/discrepancy/${code_document}?page=${page}&q=${search}`,
        }),
    }),
});

export const { useCheckAllDocumentMutation, useGetRiwayatChecksQuery, useGetDetailRiwayatCheckQuery, useDeleteRiwayatCheckMutation, useExportToExcelMutation, useGetProductLolosQuery, useGetProductDamagedQuery, useGetProductAbnormalQuery, useDiscrepancyQuery } = riwayatApi;
