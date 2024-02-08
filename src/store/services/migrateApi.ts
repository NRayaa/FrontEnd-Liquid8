import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListMigrate } from './types';
import { baseQuery } from './prepareHeader';

interface GetListMigrateIndex {
    data: {
        resource: {
            code_document_migrate: string;
            migrate: { id: number; new_barcode_product: number; new_name_product: string; new_price_product: number }[];
            new_product: {
                id: number;
                new_barcode_product: number;
                new_name_product: string;
                new_price_product: number;
            }[];
        };
    };
}

export const migrateApi = createApi({
    reducerPath: 'migrateApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListMigrate: builder.query<GetListMigrate, { page: number; q: string }>({
            query: ({ page, q }) => `/migrate-documents?page=${page}&q=${q}`,
        }),
        getIndexMigrate: builder.query<GetListMigrateIndex, string>({
            query: (q) => `/migrates?q=${q}`,
        }),
        postMigrate: builder.mutation<any, any>({
            query: (id) => ({
                url: `/migrate-add/${id}`,
                method: 'PUT',
            }),
        }),
        deleteMigrate: builder.mutation<any, any>({
            query: (id) => ({
                url: `/migrates/${id}`,
                method: 'DELETE',
            }),
        }),
        migrateFinish: builder.mutation<any, any>({
            query: (body) => ({
                url: '/migrate-finish',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetListMigrateQuery, useGetIndexMigrateQuery, usePostMigrateMutation, useDeleteMigrateMutation, useMigrateFinishMutation } = migrateApi;
