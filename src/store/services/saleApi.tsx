import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListSale, } from './types';
import { baseQuery } from './prepareHeader';

export const saleApi = createApi({
    reducerPath: 'saleApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListSale: builder.query<GetListSale, { page: number; q: string }>({
            query: ({ page, q }) => `/sales?page=${page}&q=${q}`,
        }),
    }),
});

export const { useGetListSaleQuery } = saleApi;
