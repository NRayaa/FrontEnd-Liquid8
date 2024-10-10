import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListSale, GetListSaleDocument, GetShowSaleDocument, SaleReportResponse } from './types';
import { baseQuery } from './prepareHeader';

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListSale: builder.query<GetListSale, number>({
            query: (page) => `/sales?page=${page}`,
        }),
        addSale: builder.mutation<any, any>({
            query: (body) => ({
                url: '/sales',
                method: 'POST',
                body,
            }),
        }),
        saleFinish: builder.mutation<any, any>({
            query: (body) => ({
                url: '/sale-finish',
                method: 'POST',
                body,
            }),
        }),
        deleteSale: builder.mutation<any, any>({
            query: (id) => ({
                url: `/sales/${id}`,
                method: 'DELETE',
            }),
        }),
        putGabor: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/sales/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        updatePrice: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/update_price_sales/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        getListSaleDocument: builder.query<GetListSaleDocument, { page: number; q: string }>({
            query: ({ page, q }) => `/sale-documents?page=${page}&q=${q}`,
        }),
        getShowSale: builder.query<GetShowSaleDocument, string | undefined>({
            query: (id) => `/sale-documents/${id}`,
        }),
        getSaleReport: builder.query<SaleReportResponse, string | undefined>({
            query: (code_document_sale) => `/sale-report?code_document_sale=${code_document_sale}`,
        }),
        deleteProductSale: builder.mutation<any, { saleId: any; productId: any }>({
            query: ({ saleId, productId }) => ({
                url: `/sale-document/${saleId}/${productId}/delete-product`,
                method: 'DELETE',
            }),
        }),
        addProductSale: builder.mutation<any, any>({
            query: (body) => ({
                url: '/sale-document/add-product',
                method: 'POST',
                body,
            }),
        }),
        updateCarton: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/sale-documents/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const {
    useGetListSaleQuery,
    useAddSaleMutation,
    useSaleFinishMutation,
    useDeleteSaleMutation,
    useGetListSaleDocumentQuery,
    useGetShowSaleQuery,
    useGetSaleReportQuery,
    usePutGaborMutation,
    useUpdatePriceMutation,
    useDeleteProductSaleMutation,
    useAddProductSaleMutation,
    useUpdateCartonMutation,
} = saleApi;
