import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { DetailStagging, FilterProductStagging, GetFilterProductStagging, ProductStagging, StaggingResponse } from './types';

export const staggingApi = createApi({
    reducerPath: 'staggingApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListProductStagging: builder.query<ProductStagging, { page: number; q: string }>({
            query: ({ page, q }) => `/staging_products?page=${page}&q=${q}`,
        }),
        getFilterProductStagging: builder.query<GetFilterProductStagging, number>({
            query: (page) => `/staging/filter_product?page=${page}`,
        }),
        filterProductStagging: builder.mutation<FilterProductStagging, number>({
            query: (id) => ({
                url: `/staging/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        deleteFilterProductStaggings: builder.mutation<FilterProductStagging, number>({
            query: (id) => ({
                url: `/staging/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        getStaggingProducts: builder.query<StaggingResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/staging_products?page=${page}&q=${q}`,
        }),
        doneCheckAllProductStagging: builder.mutation<any, any>({
            query: () => ({
                url: '/staging_products',
                method: 'POST',
            }),
        }),
        ApprovementStagging: builder.query<any, { q: string; page: number }>({
            query: ({ q, page }) => `/staging_approves?page=${page}&q=${q}`,
        }),
        doneCheckAllApprovementStagging: builder.mutation<any, any>({
            query: () => ({
                url: '/stagingTransactionApprove',
                method: 'GET',
            }),
        }),
        deleteApprovementStagging: builder.mutation<FilterProductStagging, number>({
            query: (id) => ({
                url: `/staging_approves/${id}`,
                method: 'DELETE',
            }),
        }),
        getDetailApprovementStagging: builder.query<DetailStagging, number | undefined | string>({
            query: (id) => ({
                url: `/staging_approves/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useGetListProductStaggingQuery,
    useGetFilterProductStaggingQuery,
    useFilterProductStaggingMutation,
    useDeleteFilterProductStaggingsMutation,
    useGetStaggingProductsQuery,
    useDoneCheckAllProductStaggingMutation,
    useApprovementStaggingQuery,
    useDoneCheckAllApprovementStaggingMutation,
    useDeleteApprovementStaggingMutation,
    useGetDetailApprovementStaggingQuery,
} = staggingApi;