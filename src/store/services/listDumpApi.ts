import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListDump, GetListProductRepair, NewProduct, ProdcutItem } from './types';
import { baseQuery } from './prepareHeader';

export const listDumpApi = createApi({
    reducerPath: 'listDumpApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetListDump: builder.query<GetListDump, { page: number; q: string }>({
            query: ({ page, q }) => `/dumps?page=${page}&q=${q}`,
        }),
        GetExport: builder.query<any, any>({
            query: () => `/export-dumps-excel`,
        }),
        updateListDump: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/update-priceDump/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetListDumpQuery, useGetExportQuery, useUpdateListDumpMutation } = listDumpApi;
