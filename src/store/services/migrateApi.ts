import { createApi } from '@reduxjs/toolkit/query/react';
import { GetListMigrate } from './types';
import { baseQuery } from './prepareHeader';

export const migrateApi = createApi({
    reducerPath: 'migrateApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getListMigrate: builder.query<GetListMigrate, { page: number; q: string }>({
            query: ({ page, q }) => `/migrate-documents?page=${page}&q=${q}`,
        }),
    }),
});

export const { useGetListMigrateQuery } = migrateApi;
