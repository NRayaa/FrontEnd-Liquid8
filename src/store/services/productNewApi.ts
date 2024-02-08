import { createApi } from '@reduxjs/toolkit/query/react';
import { DeleteNewProductResponse, DetailExpiredProduct, DetailNewProduct, GetAllNewProduct, ProductExpired } from './types';
import { baseQuery } from './prepareHeader';

export const productNewApi = createApi({
    reducerPath: 'productNewApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllProductNew: builder.query<GetAllNewProduct, { page: number; q: string }>({
            query: ({ page, q }) => `/new_products?page=${page}&q=${q}`,
        }),
        deleteProductNew: builder.mutation<DeleteNewProductResponse, number>({
            query: (id) => ({
                url: `new_products/${id}`,
                method: 'DELETE',
            }),
        }),
        detailProductNew: builder.query<DetailNewProduct, number | undefined | string>({
            query: (id) => `new_products/${id}`,
        }),
        getExpiredProducts: builder.query<ProductExpired, { page: number; q: string }>({
            query: ({ page, q }) => `/new_product/expired?page=${page}&q=${q}`,
        }),
        getDetailExpiredProduct: builder.query<DetailExpiredProduct, number | undefined>({
            query: (id) => `/new_products/${id}`,
        }),
        editDetailProduct: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/new_products/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        getDisplayExpired: builder.query<ProductExpired, { page: number; q: string }>({
            query: ({ page, q }) => `/new_product/display-expired`,
        }),
    }),
});

export const {
    useGetAllProductNewQuery,
    useDeleteProductNewMutation,
    useDetailProductNewQuery,
    useGetExpiredProductsQuery,
    useGetDetailExpiredProductQuery,
    useEditDetailProductMutation,
    useGetDisplayExpiredQuery,
} = productNewApi;
