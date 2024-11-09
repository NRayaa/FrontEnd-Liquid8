import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';

export const productInputApi = createApi({
    reducerPath: 'productInputApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListProductInput: builder.query<any, { page: number; q: string }>({
            query: ({ page, q }) => `/product_inputs?page=${page}&q=${q}`,
        }),
        getFilterProductInput: builder.query<any, { page: number }>({
            query: ({ page }) => `/filter-product-input?page=${page}`,
        }),
        filterProductInput: builder.mutation<any, number>({
            query: (id) => ({
                url: `/filter-product-input/${id}/add`,
                method: 'POST',
            }),
        }),
        deleteFilterProductInputs: builder.mutation<any, number>({
            query: (id) => ({
                url: `/filter-product-input/destroy/${id}`,
                method: 'DELETE',
            }),
        }),
        doneCheckAllProductInput: builder.mutation<any, any>({
            query: () => ({
                url: '/move_products',
                method: 'POST',
            }),
        }),
        getDetailProductInput: builder.query<any, any>({
            query: (idProduct) => `/product_inputs/${idProduct}`,
        }),
        updateProductInput: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product_inputs/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteProductInput: builder.mutation<any, number>({
            query: (id) => ({
                url: `/product_inputs/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetListProductInputQuery,
    useGetFilterProductInputQuery,
    useFilterProductInputMutation,
    useDeleteFilterProductInputsMutation,
    useDoneCheckAllProductInputMutation,
    useGetDetailProductInputQuery,
    useUpdateProductInputMutation,
    useDeleteProductInputMutation,
} = productInputApi;
