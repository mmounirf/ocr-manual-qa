import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../api/types';

interface AppState {
  loading: boolean;
  article: Article | null;
}

const initialState: AppState = {
  loading: false,
  article: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setArticle: (state, action: PayloadAction<Article | null>) => {
      state.article = action.payload;
    },
  },
});

export const { setArticle, setLoading } = appSlice.actions;

export default appSlice.reducer;
