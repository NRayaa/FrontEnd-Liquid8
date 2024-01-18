import { createApi } from '@reduxjs/toolkit/query/react';
import { DetailProductOld, ProductOlds } from './types';
import { baseQuery } from './prepareHeader';

export const productOldsApi = createApi({
    reducerPath: 'productOldsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        productOlds: builder.query<ProductOlds | undefined, number>({
            query: (page) => `/product_olds?page=${page}`,
        }),
        detailProductOld: builder.query<DetailProductOld, { codeDocument: string; page: number }>({
            query: ({ codeDocument, page }) => `/product_olds-search?search=${codeDocument}&page=${page}`,
        }),
    }),
});

export const { useProductOldsQuery, useDetailProductOldQuery } = productOldsApi;
