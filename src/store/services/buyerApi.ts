import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';
import { GetListBuyer } from './types';

export const buyerApi = createApi({
    reducerPath: 'buyerApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListBuyer: builder.query<GetListBuyer, { page: number; q: string }>({
            query: ({ page, q }) => `/buyers?page=${page}&q=${q}`,
        }),
    }),
});

export const { useGetListBuyerQuery } = buyerApi;
