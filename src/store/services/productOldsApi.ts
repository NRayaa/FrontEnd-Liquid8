import { createApi } from '@reduxjs/toolkit/query/react';
import { ProductOlds } from './types';
import { baseQuery } from './prepareHeader';

export const productOldsApi = createApi({
    reducerPath: 'productOldsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        productOlds: builder.query<ProductOlds | undefined, number>({
            query: (page) => `/product_olds?page=${page}`,
        }),
    }),
});

export const { useProductOldsQuery } = productOldsApi;
