import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListAkun } from './types';
import { baseQuery } from './prepareHeader';

export const listAkunApi = createApi({
    reducerPath: 'listAkunApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListAkun: builder.query<GetListAkun, { page: number; q: string }>({
            query: ({ page, q }) => `/users?page=${page}&q=${q}`,
        }),
        createAccount: builder.mutation<any, any>({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
        updateAccount: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteAccount: builder.mutation<any, any>({
            query: (id) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
        }),
        exportToExcelListAccount: builder.mutation<any, any>({
            query: () => ({
                url: `/exportUsers`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
        getListAccountPanel: builder.query<any, { page: number; q: string }>({
            query: ({ page, q }) => `/format-barcodes?page=${page}&q=${q}`,
        }),
        createAccountPanel: builder.mutation<any, any>({
            query: (body) => ({
                url: '/format-barcodes',
                method: 'POST',
                body,
            }),
        }),
        updateAccountPanel: builder.mutation<any, any>({
            query: ({ body, id }) => ({
                url: `/format-barcodes/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        showAccountPanel: builder.query<any, any>({
            query: (id) => ({
                url: `/format-barcodes/${id}`,
                method: 'GET',
            }),
        }),
        deleteAccountPanel: builder.mutation<any, any>({
            query: (id) => ({
                url: `/format-barcodes/${id}`,
                method: 'DELETE',
            }),
        }),
        deleteAccountBarcodePanel: builder.mutation<any, any>({
            query: (id) => ({
                url: `/panel-spv/format-delete/${id}`,
                method: 'DELETE',
            }),
        }),
        createAccountBarcodePanel: builder.mutation<any, any>({
            query: (body) => ({
                url: '/panel-spv/add-barcode',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useGetListAkunQuery,
    useCreateAccountMutation,
    useUpdateAccountMutation,
    useDeleteAccountMutation,
    useExportToExcelListAccountMutation,
    useGetListAccountPanelQuery,
    useCreateAccountPanelMutation,
    useDeleteAccountPanelMutation,
    useShowAccountPanelQuery,
    useUpdateAccountPanelMutation,
    useDeleteAccountBarcodePanelMutation,
    useCreateAccountBarcodePanelMutation,
} = listAkunApi;
