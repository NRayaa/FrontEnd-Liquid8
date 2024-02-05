import { createApi } from '@reduxjs/toolkit/query/react';
import { DeleteNewProductResponse, DetailExpiredProduct, DetailNewProduct, GetAllNewProduct, GetListAkun, ProductExpired } from './types';
import { baseQuery } from './prepareHeader';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<any, any>({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApi;
