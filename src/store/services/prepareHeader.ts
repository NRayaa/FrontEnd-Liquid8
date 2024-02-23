import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://server.wms-liquid8.online/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});
