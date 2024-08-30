import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// development
// export const baseUrl = 'https://wms-server.digitalindustryagency.com/api';

// production
export const baseUrl = 'https://server.wms-liquid8.online/api'

export const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
