import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductApprovment, GetCategories, NewProduct, NewProductBody } from './types';
import { baseQuery } from './prepareHeader';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategories, undefined>({
            query: () => '/categories',
        }),
        newProduct: builder.mutation<NewProduct, any>({
            query: (body) => ({
                url: '/product-approves',
                method: 'POST',
                body,
            }),
        }),
        getProductApproves: builder.query<ProductApprovment, number>({
            query: (page) => `/product-approves?page=${page}`,
        }),
        createCategory: builder.mutation<any, any>({
            query: (body) => ({
                url: '/categories',
                method: 'POST',
                body,
            }),
        }),
        updateCategory: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deleteCategory: builder.mutation<any, any>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetCategoriesQuery, useNewProductMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetProductApprovesQuery } = categoriesApi;
