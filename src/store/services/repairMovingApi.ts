import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { DetailRepairResponse, RepairResponse } from './types';

export const repairMovingProductsApi = createApi({
    reducerPath: 'repairMovingProductsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRepairMovingProducts: builder.query<RepairResponse, string>({
            query: (search) => `/repair-mv?q=${search}`,
        }),
        getFilterRepairMovingProducts: builder.query({
            query: (page) => `/repair-mv/filter_product?page=${page}`,
        }),
        filterRepairMovingProducts: builder.mutation({
            query: (id) => ({
                url: `/repair-mv/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        deleteFilterRepairMovingProducts: builder.mutation({
            query: (id) => ({
                url: `/repair-mv/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createRepairMovingProducts: builder.mutation({
            query: (body) => ({
                url: `/repair-mv`,
                method: 'POST',
                body,
            }),
        }),
        getShowRepairMovingProducts: builder.query<DetailRepairResponse, any>({
            query: (id) => `/repair-mv/${id}`,
        }),
        unrepairMovingProduct: builder.mutation<any, number>({
            query: (id) => ({
                url: `/repair-mv/${id}`,
                method: 'DELETE',
            }),
        }),
        updateThrowsDetail: builder.mutation<any, any>({
            query: (id) => ({
                url: `/update-repair-dump/${id}`,
                method: 'PUT',
            }),
        }),
        deleteReprair: builder.mutation({
            query: (id) => ({
                url: `/product-repair/${id}`,
                method: 'DELETE',
            }),
        }),
        updateReprair: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product-repair/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        getProductRepair: builder.query<any, any>({
            query: (id) => `/repair-product-mv/${id}`,
        }),
          exportToExcelDetailRepair: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/exportRepairDetail/${id}`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
    }),
});

export const {
    useGetRepairMovingProductsQuery,
    useGetFilterRepairMovingProductsQuery,
    useFilterRepairMovingProductsMutation,
    useDeleteFilterRepairMovingProductsMutation,
    useCreateRepairMovingProductsMutation,
    useGetShowRepairMovingProductsQuery,
    useUnrepairMovingProductMutation,
    useUpdateThrowsDetailMutation,
    useDeleteReprairMutation,
    useUpdateReprairMutation,
    useGetProductRepairQuery,
      useExportToExcelDetailRepairMutation,
} = repairMovingProductsApi;
