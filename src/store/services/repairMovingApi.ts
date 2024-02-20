import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';

export interface RepairItem {
    id: number;
    repair_name: string;
    total_price: string;
    total_price_custom: string;
    total_products: string;
    barcode: string;
    created_at: string;
    updated_at: string;
    repair_products: RepairSubItem[];
}

export interface RepairSubItem {
    id: number;
    repair_id: string;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}

export interface RepairResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: RepairItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface Links {
    url: string | null;
    label: string;
    active: boolean;
}

export const repairMovingProductsApi = createApi({
    reducerPath: 'repairMovingProductsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRepairMovingProducts: builder.query<RepairResponse, any>({
            query: () => '/repair-mv',
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
        deleteRepairMovingProducts: builder.mutation({
            query: (id) => ({
                url: `/repair-mv/${id}`,
                method: 'DELETE',
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
    useDeleteRepairMovingProductsMutation,
} = repairMovingProductsApi;
