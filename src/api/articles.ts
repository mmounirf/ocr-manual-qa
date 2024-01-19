import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type { Article, ArticlesResponse, FilterArticlesQuery, QueryParams } from './types';

export const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery,
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, Partial<QueryParams>>({
      query: (params) => ({
        method: 'GET',
        url: '/articles/',
        params,
      }),
      providesTags: (result, error, arg) =>
        result?.data.length
          ? [...result.data.map(({ id }) => ({ type: 'Article' as const, id })), 'Article']
          : ['Article'],
    }),
    getArticle: builder.query<Article, { article_id: string }>({
      query: ({ article_id }) => ({
        method: 'GET',
        url: '/articles/article_id',
        params: { article_id },
      }),
      providesTags: (result, error, { article_id }) => [{ type: 'Article', id: article_id }],
    }),
    filterArticles: builder.mutation<ArticlesResponse, FilterArticlesQuery>({
      query: (body) => ({
        method: 'POST',
        url: '/articles/q',
        body,
      }),
    }),
    updateArticle: builder.mutation<
      Article,
      Pick<Article, 'id' | 'post_text' | 'text_words' | 'authors' | 'page' | 'date' | 'status'>
    >({
      query: ({ id, ...body }) => ({
        method: 'PUT',
        url: '/articles/article_id',
        params: { article_id: id },
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Article', id: arg.id }],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useLazyGetArticlesQuery,
  useUpdateArticleMutation,
  useFilterArticlesMutation,
} = articlesApi;
