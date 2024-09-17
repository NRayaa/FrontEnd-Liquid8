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
        createPallete: builder.mutation<CreatePaletResponse, CreatePaletBody>({
            query: (body) => ({
                url: '/palet',
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
            query: (id) => `/palet/${id}`,
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
} = palletApi;
