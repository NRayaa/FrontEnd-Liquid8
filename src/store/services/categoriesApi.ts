import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductApprovment, GetCategories, NewProduct, NewProductBody, DocumentApprovment } from './types';
import { baseQuery } from './prepareHeader';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getCategories: builder.query<GetCategories, string>({
            query: (search) => `/categories?q=${search}`,
        }),
        newProduct: builder.mutation<NewProduct, any>({
            query: (body) => ({
                url: '/product-approves',
                method: 'POST',
                body,
            }),
        }),
        getProductApproves: builder.query<ProductApprovment, { p: number; q: string }>({
            query: ({ p, q }) => `/product-approves?page=${p}&q=${q}`,
        }),
        getDocumentApproves: builder.query<DocumentApprovment, { p: number; q: string }>({
            query: ({ p, q }) => `/documents-approve?page=${p}&q=${q}`,
        }),
        getDetailProductApprovesByDoc: builder.query<any, number | undefined>({
            query: (code_document) => `/product-approveByDoc/${code_document}`,
        }),
        // getDetailProductApprovesByDoc: builder.query<any, string | undefined>({
        //     query: (code_document) => `productApprovesByDoc?search=${code_document}`,
        // }),
        getDetailProductApproves: builder.query<any, number | undefined>({
            query: (idProduct) => `/product-approves/${idProduct}`,
        }),
        editProductApproves: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/product-approves/${id}`,
                method: 'PUT',
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
        exportToExcelSubCategory: builder.mutation<any, any>({
            query: () => ({
                url: `/exportCategory`,
                method: 'POST',
                responseType: 'blob',
            }),
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useNewProductMutation,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetProductApprovesQuery,
    useGetDocumentApprovesQuery,
    useGetDetailProductApprovesByDocQuery,
    useGetDetailProductApprovesQuery,
    useEditProductApprovesMutation,
    useExportToExcelSubCategoryMutation,
} = categoriesApi;
