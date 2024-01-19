import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from './utils';

import type { Document, DocumentsResponse, QueryParams } from './types';

export const documentsApi = createApi({
  reducerPath: 'documents',
  baseQuery: fetchBaseQuery,
  tagTypes: ['Documents', 'Document'],
  endpoints: (builder) => ({
    getDocuments: builder.query<DocumentsResponse, Partial<QueryParams>>({
      query: (params) => ({
        method: 'GET',
        url: '/documents/',
        params,
      }),
      providesTags: (result, error, arg) =>
        result?.data.length
          ? [...result.data.map(({ id }) => ({ type: 'Document' as const, id })), 'Document']
          : ['Document'],
    }),
    getDocument: builder.query<Document, { document_id: string }>({
      query: ({ document_id }) => ({
        method: 'GET',
        url: '/documents/document_id/',
        params: { document_id },
      }),
      providesTags: (result, error, { document_id }) => [{ type: 'Documents', id: document_id }],
    }),
  }),
});

export const { useGetDocumentsQuery, useGetDocumentQuery } = documentsApi;
