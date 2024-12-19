// src/redux/cartRTKApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import config from '@/config';

const baseQuery = fetchBaseQuery({
    baseUrl: config.BASE_URL,
    prepareHeaders: (headers) => {
        const auth = localStorage.getItem('auth');
        const token = JSON.parse(auth) || '';
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const cartRTKApi = createApi({
    reducerPath: 'cartRTKApi',
    baseQuery,
    tagTypes: ['Cart', 'Enrollment'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => 'cart/me',
            providesTags: ['Cart'],
        }),
        addToCart: builder.mutation({
            query: (payload) => ({
                url: 'cart/add',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Cart'],
        }),
        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `cart/remove/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        clearCart: builder.mutation({
            query: () => ({
                url: 'cart',
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'],
        }),
        getEnrollment: builder.query({
            query: () => 'enrollment/me',
            providesTags: ['Enrollment']
        }),
        getCompletedEnrollment: builder.query({
            query: () => 'enrollment/completed',
            providesTags: ['Enrollment'],

        }),
        getInProgressEnrollment: builder.query({
            query: () => 'enrollment/in-progress',
            providesTags: ['Enrollment'],
        }),
        getCertificate: builder.query({
            query: (courseId) => `enrollment/certificate/${courseId}`,
            providesTags: ['Enrollment'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
    useGetEnrollmentQuery,
    useGetCompletedEnrollmentQuery,
    useGetInProgressEnrollmentQuery,
    useGetCertificateQuery,
} = cartRTKApi;
