import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// development
export const baseUrl = 'https://wms-server.digitalindustryagency.com';

// production
// export const baseUrl = 'https://server.wms-liquid8.online'

export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/api`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
