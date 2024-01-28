import { createApi } from '@reduxjs/toolkit/query/react';
import { DetailPromo, EditPromoBody, EditPromoResponse, PromoLists } from './types';
import { baseQuery } from './prepareHeader';

export const promoApi = createApi({
    reducerPath: 'promoApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getPromotLists: builder.query<PromoLists, number>({
            query: (page) => `/promo?page=${page}`,
        }),
        detailPromo: builder.query<DetailPromo, number>({
            query: (id) => `/promo/${id}`,
        }),
        editPromo: builder.mutation<EditPromoResponse, { id: number; body: EditPromoBody }>({
            query: ({ id, body }) => ({
                url: `/promo/${id}`,
                method: 'PUT',
                body,
            }),
        }),
        deletePromo: builder.mutation<
            {
                data: {
                    status: boolean;
                    message: string;
                    resource: null;
                };
            },
            { idPromo: number; idProduct: number }
        >({
            query: ({ idPromo, idProduct }) => ({
                url: `/promo/destroy/${idPromo}/${idProduct}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetPromotListsQuery, useDetailPromoQuery, useEditPromoMutation, useDeletePromoMutation } = promoApi;
