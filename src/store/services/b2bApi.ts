import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { GetListB2B, GetListBuyer } from './types';

export const b2bApi = createApi({
    reducerPath: 'b2bApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListB2B: builder.query<GetListB2B, { page: number; q: string }>({
            query: ({ page, q }) => `/bulky-documents?page=${page}&q=${q}`,
        }),
        addB2B: builder.mutation<any, any>({
            query: (body) => ({
                url: '/bulky-sales',
                method: 'POST',
                body,
            }),
        }),
        deleteB2B: builder.mutation<any, any>({
            query: (id) => ({
                url: `/bulky-documents/${id}`,
                method: 'DELETE',
            }),
        }),
        detailB2B: builder.query<any, string | undefined>({
            query: (id) => `/bulky-documents/${id}`,
        }),
    }),
});

export const { useGetListB2BQuery, useAddB2BMutation, useDeleteB2BMutation, useDetailB2BQuery } = b2bApi;
