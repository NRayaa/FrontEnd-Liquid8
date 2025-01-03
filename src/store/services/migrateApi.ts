import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateBundle, CreateMigratedBulkyProduct, DetailBundleResponse, DetailMigratedCategoryResponse, FilterMigratedBulkyProduct, FilterProduct, GetCountColor, GetDisplayMigrate, GetFilterMigratedBulkyProduct, GetFilterProductBundles, GetListDestination, GetListMigrate, GetListMigrateCategory, MigratedBulkyProductItem, MigratedBulkyResponse, ProductExpired } from './types';
import { baseQuery } from './prepareHeader';

interface GetListMigrateIndex {
    data: {
        resource: {
            code_document_migrate: string;
            migrate: {
                total: number;
                per_page: number;
                data: { id: number; old_barcode_product: number; new_name_product: string; new_price_product: number }[];
            };
            new_product: {
                total: number;
                per_page: number;
                data: {
                    id: number;
                    old_barcode_product: number;
                    new_name_product: string;
                    new_price_product: number;
                }[];
            };
        };
    };
}

interface GetShowMigrateProps {
    data: {
        resource: {
            code_document_migrate: string;
            destiny_document_migrate: string;
            total_price_document_migrate: number;
            total_product_document_migrate: number;
            migrates: {
                old_barcode_product: number;
                new_barcode_product: number;
                new_name_product: string;
                new_price_product: number;
                new_qty_product: number;
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
        getDisplayMigrate: builder.query<GetDisplayMigrate, any>({
            query: () => `/displayMigrate`,
        }),
        getIndexMigrate: builder.query<GetListMigrateIndex, { q: string; migratePage: number; productPage: number }>({
            query: ({ q, migratePage, productPage }) => `/migrates?migrate_page=${migratePage}&product_page=${productPage}&q=${q}`,
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
        getShowMigrate: builder.query<GetShowMigrateProps, string | undefined>({
            query: (id) => `/migrate-documents/${id}`,
        }),
        getColorCount: builder.query<GetCountColor, undefined>({
            query: () => '/countColor',
        }),
        addMigrate: builder.mutation<any, any>({
            query: (body) => ({
                url: '/bundleMigrate',
                method: 'POST',
                body,
            }),
        }),
        migrate: builder.mutation<any, any>({
            query: (body) => ({
                url: '/migrates',
                method: 'POST',
                body,
            }),
        }),
        getListDestination: builder.query<GetListDestination, { page: number; q: string }>({
            query: ({ page, q }) => `/destinations?page=${page}&q=${q}`,
        }),
        createDestination: builder.mutation<any, any>({
            query: (body) => ({
                url: '/destinations',
                method: 'POST',
                body,
            }),
        }),
        updateDestination: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/destinations/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteDestination: builder.mutation<any, any>({
            query: (id) => ({
                url: `/destinations/${id}`,
                method: 'DELETE',
            }),
        }),
        getListDestinationOption: builder.query<GetListDestination, any>({
            query: () => `/destinations`,
        }),
        exportToExcelDetailListMigrate: builder.mutation<any, { id: string }>({
            query: ({ id }) => ({
                url: `/exportMigrateDetail/${id}`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
        getListMigrateCategory: builder.query<MigratedBulkyResponse, { page: number; q: string }>({
            query: ({ page, q }) => `/migrate-bulky?page=${page}&q=${q}`,
        }),
        filterProductMigrateCategory: builder.mutation<FilterProduct, number>({
            query: (id) => ({
                url: `/migrate-bulky-product/${id}/add`,
                method: 'GET',
            }),
        }),
        getFilterProductMigrateCategory: builder.query<GetFilterMigratedBulkyProduct, number>({
            query: () => `/migrate-bulky-product`,
        }),
        deleteFilterProductMigrateCategory: builder.mutation<FilterMigratedBulkyProduct, number>({
            query: (id) => ({
                url: `/migrate-bulky-product/${id}/delete`,
                method: 'DELETE',
            }),
        }),
        createFilterProductMigrateCategory: builder.mutation<CreateMigratedBulkyProduct, any>({
            query: (body) => ({
                url: '/migrate-bulky-finish',
                method: 'POST',
                body,
            }),
        }),
        detailProductMigrateCategory: builder.query<DetailMigratedCategoryResponse, number>({
            query: (id) => `/migrate-bulky/${id}`,
        }),
    }),
});

export const {
    useGetListMigrateQuery,
    useGetIndexMigrateQuery,
    usePostMigrateMutation,
    useDeleteMigrateMutation,
    useMigrateFinishMutation,
    useGetShowMigrateQuery,
    useGetColorCountQuery,
    useAddMigrateMutation,
    useMigrateMutation,
    useGetListDestinationQuery,
    useCreateDestinationMutation,
    useUpdateDestinationMutation,
    useDeleteDestinationMutation,
    useGetDisplayMigrateQuery,
    useGetListDestinationOptionQuery,
    useExportToExcelDetailListMigrateMutation,
    useGetListMigrateCategoryQuery,
    useFilterProductMigrateCategoryMutation,
    useGetFilterProductMigrateCategoryQuery,
    useDeleteFilterProductMigrateCategoryMutation,
    useCreateFilterProductMigrateCategoryMutation,
    useDetailProductMigrateCategoryQuery,
} = migrateApi;
