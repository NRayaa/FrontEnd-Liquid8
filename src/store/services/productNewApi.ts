import { createApi } from '@reduxjs/toolkit/query/react';
import { DeleteNewProductResponse, GetAllNewProduct } from './types';
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
        detailProductNew: builder.query<DeleteNewProductResponse, number | undefined | string>({
            query: (id) => `new_products/${id}`,
        }),
    }),
});

export const { useGetAllProductNewQuery, useDeleteProductNewMutation, useDetailProductNewQuery } = productNewApi;
