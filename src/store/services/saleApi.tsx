import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListSale, GetListSaleDocument, } from './types';
import { baseQuery } from './prepareHeader';

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListSale: builder.query<GetListSale, { page: number; q: string }>({
            query: ({ page, q }) => `/sales?page=${page}&q=${q}`,
        }),
        addSale: builder.mutation<any, any>({
            query: (body) => ({
                url: '/sales',
                method: 'POST',
                body,
            }),
        }),
        saleFinish: builder.mutation<any, any>({
            query: () => ({
                url: '/sale-finish',
                method: 'POST',
            }),
        }),
        deleteSale: builder.mutation<any, any>({
            query: (id) => ({
                url: `/sales/${id}`,
                method: 'DELETE',
            }),
        }),
        getListSaleDocument: builder.query<GetListSaleDocument, { page: number; q: string }>({
            query: ({ page, q }) => `/sale-documents?page=${page}&q=${q}`,
        }),
    }),
});

export const { useGetListSaleQuery, useAddSaleMutation, useSaleFinishMutation, useDeleteSaleMutation, useGetListSaleDocumentQuery } = saleApi;
