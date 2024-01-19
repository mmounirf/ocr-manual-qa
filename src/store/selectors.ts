import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectLoading = createSelector(
  (state: RootState) => state.app,
  (app) => app.loading
);

export const selectArticle = createSelector(
  (state: RootState) => state.app,
  (app) => app.article
);
