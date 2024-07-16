import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { GetListBuyer } from './types';

export const buyerApi = createApi({
    reducerPath: 'buyerApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListBuyer: builder.query<GetListBuyer, { page: number; q: string }>({
            query: ({ page, q }) => `/buyers?page=${page}&q=${q}`,
        }),
        addBuyer: builder.mutation<any, any>({
            query: (body) => ({
                url: '/buyers',
                method: 'POST',
                body,
            }),
        }),
        updatedBuyer: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/buyers/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteBuyer: builder.mutation<any, any>({
            query: (id) => ({
                url: `/buyers/${id}`,
                method: 'DELETE',
            }),
        }),
        exportToExcelBuyer: builder.mutation<any, any>({
            query: () => ({
                url: `/exportBuyers`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
    }),
});

export const { useGetListBuyerQuery, useAddBuyerMutation, useUpdatedBuyerMutation, useDeleteBuyerMutation, useExportToExcelBuyerMutation } = buyerApi;
