import { createApi } from '@reduxjs/toolkit/query/react';
import { CheckProductDocument, GetBarcodeBody, GetBarcodeResponse, GetNameBody, GetNameResponse, ScanResult, ScanResultItem } from './types';
import { baseQuery } from './prepareHeader';

export const checkProduct = createApi({
    reducerPath: 'checkProduct',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        documentsCheckProducts: builder.query<CheckProductDocument, { page: number; search: string }>({
            query: ({ page, search }) => `/documents?page=${page}&q=${search}`,
        }),
        getBarcode: builder.query<GetBarcodeResponse | undefined, GetBarcodeBody>({
            query: ({ code_document, old_barcode_product }) => `/search_barcode_product?code_document=${code_document}&old_barcode_product=${old_barcode_product}`,
        }),
        getProductRepair: builder.query<GetBarcodeResponse | undefined, GetBarcodeBody>({
            query: ({ code_document, old_barcode_product }) => `/getProductRepair?code_document=${code_document}&old_barcode_product=${old_barcode_product}`,
        }),
        deleteDocument: builder.mutation<any, any>({
            query: (id) => ({
                url: `/documents/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteApprove: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-approves/${id}`,
                method: 'DELETE',
            }),
        }),
        checkPrice: builder.mutation<any, any>({
            query: (body) => ({
                url: '/check-price',
                method: 'POST',
                body,
            }),
        }),
        deleteAllByCodeDocument: builder.mutation<any, any>({
            query: (id) => ({
                url: `/delete_all_by_codeDocument?code_document=${id}`,
                method: 'DELETE',
            }),
        }),
        deleteApproveDocumentItem: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product-approves/${id}`,
                method: 'DELETE',
            }),
        }),
        ListScanResult: builder.query<ScanResult, { page: number; search: string }>({
            query: ({ page, search }) => `/product_scans?page=${page}&q=${search}`,
        }),
        deleteScanResult: builder.mutation<any, any>({
            query: (id) => ({
                url: `/product_scans/${id}`,
                method: 'DELETE',
            }),
        }),
        getName: builder.query<GetNameResponse | undefined, GetNameBody>({
            query: ({ id }) => `/product_scan_search?id=${id}`,
        }),
        partialStaging: builder.mutation<any, any>({
            query: (code_document) => ({
                url: `/partial-staging/${code_document}`,
                method: 'POST',
            }),
        }),
        getBarcodeProduct: builder.query<any, any>({
            query: () => `/product_scan_search`,
        }),
    }),
});

export const {
    useDocumentsCheckProductsQuery,
    useLazyGetBarcodeQuery,
    useDeleteDocumentMutation,
    useDeleteApproveMutation,
    useLazyGetProductRepairQuery,
    useCheckPriceMutation,
    useDeleteAllByCodeDocumentMutation,
    useDeleteApproveDocumentItemMutation,
    useListScanResultQuery,
    useDeleteScanResultMutation,
    useLazyGetNameQuery,
    usePartialStagingMutation,
    useLazyGetBarcodeProductQuery,
} = checkProduct;
