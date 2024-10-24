import { createApi } from '@reduxjs/toolkit/query/react';
import { BundleResponse, DetailBundleResponse, DeleteBundleResponse, FilterProduct, GetFilterProductBundles, CreateBundle, CreateBundleBody, ExportToExcel } from './types';
import { baseQuery } from './prepareHeader';

export const bundleProductApi = createApi({
    reducerPath: 'bundleProductApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBundleProducts: builder.query<BundleResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/bundle?page=${page}&q=${q}`,
        }),
        detailBundleProduct: builder.query<DetailBundleResponse, number>({
            query: (id) => `/bundle/${id}`,
        }),
        deleteBundleProduct: builder.mutation<DeleteBundleResponse, number | undefined>({
            query: (id) => ({
                url: `/bundle/${id}`,
                method: 'DELETE',
            }),
        }),
        filterProductBundle: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/bundle/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        getFilterProductBundles: builder.query<GetFilterProductBundles, number>({
            query: (page) => `/bundle/filter_product?page=${page}`,
        }),
        deleteFilterProductBundles: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/bundle/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createBundle: builder.mutation<CreateBundle, any>({
            query: (body) => ({
                url: '/bundle',
                method: 'POST',
                body,
            }),
        }),
        deleteDetailBundleProduct: builder.mutation<DeleteBundleResponse, number | undefined>({
            query: (id) => ({
                url: `/product-bundle/${id}`,
                method: 'DELETE',
            }),
        }),
        addDetailBundleProduct: builder.mutation<any, { productId: string, bundleId: string }>({
            query: ({ productId, bundleId }) => ({
                url: `/product-bundle/${bundleId}/${productId}/add`,
                method: 'GET',
            }),
        }),
        exportToExcelDetailBundle: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/exportBundlesDetail/${id}`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
        updateDetailBundle: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/bundle/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useGetBundleProductsQuery,
    useDetailBundleProductQuery,
    useDeleteBundleProductMutation,
    useFilterProductBundleMutation,
    useGetFilterProductBundlesQuery,
    useDeleteFilterProductBundlesMutation,
    useCreateBundleMutation,
    useDeleteDetailBundleProductMutation,
    useAddDetailBundleProductMutation,
    useExportToExcelDetailBundleMutation,
    useUpdateDetailBundleMutation,
} = bundleProductApi;
