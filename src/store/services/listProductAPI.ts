import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListProductRepair } from './types';
import { baseQuery } from './prepareHeader';

export const listProductApi = createApi({
    reducerPath: 'listProductApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        GetListProductRepair: builder.query<GetListProductRepair, undefined>({
            query: () => '/repair',
        }),
        updateProductRepair: builder.mutation<any, any>({
            query: ({ id, body }) => ({
                url: `/repair/update/${id}`,
                method: 'PUT',
                body,
            }),
        }),
    }),
});

export const { useGetListProductRepairQuery, useUpdateProductRepairMutation} = listProductApi;
