import { createApi } from '@reduxjs/toolkit/query/react';
import { CheckAllProducts, DetailGetRiwayatcheck, GetRiwayatcheck } from './types';
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
        getRiwayatChecks: builder.query<GetRiwayatcheck, number>({
            query: (page) => `/historys?page=${page}`,
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
    }),
});

export const { useCheckAllDocumentMutation, useGetRiwayatChecksQuery, useGetDetailRiwayatCheckQuery, useDeleteRiwayatCheckMutation } = riwayatApi;
