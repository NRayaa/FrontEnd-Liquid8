import { createApi } from '@reduxjs/toolkit/query/react';
import {
    CreatePaletBody,
    CreatePaletResponse,
    DeleteDetailPalleteResponse,
    DeletePaletList,
    DetailPalletProps,
    DisplayPallet,
    ExportToExcel,
    FilterDisplayPallet,
    GetListKondisi,
    GetListMerk,
    GetListStatus,
    PaletLists,
    filterPalletLists,
} from './types';
import { baseQuery } from './prepareHeader';

export const palletApi = createApi({
    reducerPath: 'palletApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        palletLists: builder.query<PaletLists, { page: number; q: string }>({
            query: ({ page, q }) => `/palet?page=${page}&q=${q}`,
        }),
        deletePallet: builder.mutation<DeletePaletList, number>({
            query: (id) => ({
                url: `/palet/${id}`,
                method: 'DELETE',
            }),
        }),
        displayPalletLists: builder.query<DisplayPallet, { page: number; q: string }>({
            query: ({ page, q }) => `/palet/display?page=${page}&q=${q}`,
        }),
        filterPallet: builder.mutation<FilterDisplayPallet, number>({
            query: (id) => ({
                url: `/palet/filter_product/${id}/add`,
                method: 'POST',
            }),
        }),
        filterProductLists: builder.query<filterPalletLists, number>({
            query: (page) => `/palet/filter_product?page=${page}`,
        }),
        deleteFilterProduct: builder.mutation<DeletePaletList, number>({
            query: (id) => ({
                url: `/palet/filter_product/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        createPallete: builder.mutation<any, any>({
            query: (body) => ({
                url: '/addPalet',
                method: 'POST',
                body,
            }),
        }),
        uploadPallete: builder.mutation<any, any>({
            query: (body) => ({
                url: '/palet-images',
                method: 'POST',
                body,
            }),
        }),
        showPallet: builder.query<DetailPalletProps, number>({
            query: (id) => `/palets-detail/${id}`,
        }),
        deleteDetailPalletProduct: builder.mutation<DeleteDetailPalleteResponse, number | undefined>({
            query: (id) => ({
                url: `/product-palet/${id}`,
                method: 'DELETE',
            }),
        }),
        addDetailPalletProduct: builder.mutation<any, { productId: string; palletId: string }>({
            query: ({ productId, palletId }) => ({
                url: `/product-palet/${palletId}/${productId}/add`,
                method: 'GET',
            }),
        }),
        updateDetailPallet: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/palet/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        exportToExcelDetailPallet: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/exportPalletsDetail/${id}`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
        getListStatus: builder.query<GetListStatus, { page: number; q: string }>({
            query: ({ page, q }) => `/product-statuses?page=${page}&q=${q}`,
        }),
        addStatus: builder.mutation<any, any>({
            query: (body) => ({
                url: '/product-statuses',
                method: 'POST',
                body,
            }),
        }),
        updatedStatus: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product-statuses/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteStatus: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-statuses/${id}`,
                method: 'DELETE',
            }),
        }),
        getListKondisi: builder.query<GetListKondisi, { page: number; q: string }>({
            query: ({ page, q }) => `/product-conditions?page=${page}&q=${q}`,
        }),
        addKondisi: builder.mutation<any, any>({
            query: (body) => ({
                url: '/product-conditions',
                method: 'POST',
                body,
            }),
        }),
        updatedKondisi: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product-conditions/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteKondisi: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-conditions/${id}`,
                method: 'DELETE',
            }),
        }),
        getListMerk: builder.query<GetListMerk, { page: number; q: string }>({
            query: ({ page, q }) => `/product-brands?page=${page}&q=${q}`,
        }),
        addMerk: builder.mutation<any, any>({
            query: (body) => ({
                url: '/product-brands',
                method: 'POST',
                body,
            }),
        }),
        updatedMerk: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product-brands/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteMerk: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-brands/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    usePalletListsQuery,
    useDeletePalletMutation,
    useDisplayPalletListsQuery,
    useFilterPalletMutation,
    useFilterProductListsQuery,
    useDeleteFilterProductMutation,
    useCreatePalleteMutation,
    useShowPalletQuery,
    useDeleteDetailPalletProductMutation,
    useAddDetailPalletProductMutation,
    useUpdateDetailPalletMutation,
    useExportToExcelDetailPalletMutation,
    useUploadPalleteMutation,
    useGetListStatusQuery,
    useAddStatusMutation,
    useUpdatedStatusMutation,
    useDeleteStatusMutation,
    useGetListKondisiQuery,
    useAddKondisiMutation,
    useUpdatedKondisiMutation,
    useDeleteKondisiMutation,
    useGetListMerkQuery,
    useAddMerkMutation,
    useUpdatedMerkMutation,
    useDeleteMerkMutation,
} = palletApi;
