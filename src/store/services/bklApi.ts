import { createApi } from '@reduxjs/toolkit/query/react';
import { BklFilterResponse, BklItem, BklResponse, BklSubItem, FilterProduct, GetFilterProductBundles, ProductExpired } from './types';
import { baseQuery } from './prepareHeader';

export const bklApi = createApi({
    reducerPath: 'bklApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBklList: builder.query<BklResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/bkls?page=${page}&q=${q}`,
        }),
        getDisplayExpired: builder.query<ProductExpired, { page: number; q: string }>({
            query: ({ page, q }) => `/new_product/display-expired?page=${page}&q=${q}`,
        }),
        filterProductBkl: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/bkl/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        getFilterProductBkl: builder.query<BklFilterResponse, number>({
            query: (page) => `/bkl/filter_product?page=${page}`,
        }),
        deleteFilterProductBkls: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/bkl/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        sendToBkl: builder.mutation<any, any>({
            query: (body) => ({
                url: '/bkls',
                method: 'POST',
                body,
            }),
        }),
        deleteProductBkl: builder.mutation<any, any>({
            query: (id) => ({
                url: `/bkls/${id}`,
                method: 'DELETE',
            }),
        }),
        getDetailBkl: builder.query<BklResponse, number | undefined | string>({
            query: (id) => ({
                url: `/bkls/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetBklListQuery,
    useGetDisplayExpiredQuery,
    useFilterProductBklMutation,
    useGetFilterProductBklQuery,
    useDeleteFilterProductBklsMutation,
    useSendToBklMutation,
    useDeleteProductBklMutation,
    useGetDetailBklQuery,
} = bklApi;
