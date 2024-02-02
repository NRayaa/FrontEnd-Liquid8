import { createApi } from '@reduxjs/toolkit/query/react';
import { DeleteNewProductResponse, DetailExpiredProduct, DetailNewProduct, GetAllNewProduct, ProductExpired } from './types';
import { baseQuery } from './prepareHeader';

export const productNewApi = createApi({
    reducerPath: 'productNewApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllProductNew: builder.query<GetAllNewProduct, number>({
            query: (page) => `/new_products?page=${page}`,
        }),
        deleteProductNew: builder.mutation<DeleteNewProductResponse, number>({
            query: (id) => ({
                url: `new_products/${id}`,
                method: 'DELETE',
            }),
        }),
        // detailProductNew: builder.query<DeleteNewProductResponse, number | undefined | string>({
        //     query: (id) => `new_products/${id}`,
        // }),
        detailProductNew: builder.query<DetailNewProduct, number | undefined | string>({
            query: (id) => `new_products/${id}`,
        }),
        getExpiredProducts: builder.query<ProductExpired, number>({
            query: (page) => `/new_product/expired?page=${page}`,
        }),
        getDetailExpiredProduct: builder.query<DetailExpiredProduct, number | undefined>({
            query: (id) => `/new_products/${id}`,
        }),
    }),
});

export const { useGetAllProductNewQuery, useDeleteProductNewMutation, useDetailProductNewQuery, useGetExpiredProductsQuery, useGetDetailExpiredProductQuery } = productNewApi;
