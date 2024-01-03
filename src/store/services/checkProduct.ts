import { createApi } from '@reduxjs/toolkit/query/react';
import { Barcode, CheckProductDocument } from './types';
import { baseQuery } from './prepareHeader';

export const checkProduct = createApi({
    reducerPath: 'checkProduct',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getBarcode: builder.query<Barcode, string>({
            query: (barcode) => `/barcode?barcode=${barcode}`,
        }),
        documentsCheckProducts: builder.query<CheckProductDocument, undefined>({
            query: () => '/documents',
        }),
    }),
});

export const { useGetBarcodeQuery, useDocumentsCheckProductsQuery } = checkProduct;
