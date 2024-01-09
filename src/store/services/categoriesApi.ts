import { createApi } from '@reduxjs/toolkit/query/react';
import { GetCategories, NewProduct, NewProductBody } from './types';
import { baseQuery } from './prepareHeader';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategories, undefined>({
            query: () => '/categories',
        }),
        newProduct: builder.mutation<NewProduct, NewProductBody>({
            query: (body) => ({
                url: '/new_products',
                method: 'POST',
                body,
            }),
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

export const { useGetCategoriesQuery, useNewProductMutation, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoriesApi;
