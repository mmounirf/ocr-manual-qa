import { configureStore } from '@reduxjs/toolkit';
import { articlesApi } from '../api/articles';
import { documentsApi } from '../api/documents';
import { pagesApi } from '../api/pages.ts';
import { appSlice } from './app.slice';
import { updateArticleListener } from './middlewares';

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [pagesApi.reducerPath]: pagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pagesApi.middleware,
      articlesApi.middleware,
      documentsApi.middleware,
      updateArticleListener.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
