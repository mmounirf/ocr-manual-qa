import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type { Page, PagesResponse, QueryParams } from './types';

export const pagesApi = createApi({
  reducerPath: 'pages',
  baseQuery: fetchBaseQuery,
  tagTypes: ['Pages', 'Page'],
  endpoints: (builder) => ({
    getPages: builder.query<PagesResponse, Partial<QueryParams>>({
      query: (params) => ({
        method: 'GET',
        url: '/pages/',
        params,
      }),
      providesTags: (result, error, arg) =>
        result?.data.length
          ? [...result.data.map(({ id }) => ({ type: 'Page' as const, id })), 'Pages']
          : ['Page'],
    }),
    getPage: builder.query<Page, { page_id: string }>({
      query: ({ page_id }) => ({
        method: 'GET',
        url: '/pages/page_id',
        params: { page_id },
      }),
      providesTags: (result, error, { page_id }) => [{ type: 'Pages', id: page_id }],
    }),
  }),
});

export const { useGetPagesQuery, useGetPageQuery, useLazyGetPageQuery } = pagesApi;
