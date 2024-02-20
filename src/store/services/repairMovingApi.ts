import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './prepareHeader';

export const repairMovingProductsApi = createApi({
    reducerPath: 'repairMovingProductsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRepairMovingProducts: builder.query({
            query: () => '/repair-mv',
        }),
    }),
});

export const { useGetRepairMovingProductsQuery } = repairMovingProductsApi;
