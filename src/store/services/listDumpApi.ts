import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListDump, GetListProductRepair, NewProduct, ProdcutItem } from './types';
import { baseQuery } from './prepareHeader';

export const listDumpApi = createApi({
    reducerPath: 'listDumpApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetListDump: builder.query<GetListDump, undefined>({
            query: () => '/dumps',
        }),
        // updateProductRepair: builder.mutation<any, any>({
        //     query: ({ id, body }) => ({
        //         url: `/repair/update/${id}`,
        //         method: 'PUT',
        //         body,
        //     }),
        // }),
    }),
});

export const { useGetListDumpQuery} = listDumpApi;
