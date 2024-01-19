import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { pagesApi } from "../api/pages";
import { Article } from "../api/types";

export const updateArticleListener = createListenerMiddleware();

const updateArticleAction = createAction<Article>("articles/executeMutation/fulfilled");

updateArticleListener.startListening({
  actionCreator: updateArticleAction,
  effect: async (action, api) => {
    api.dispatch(pagesApi.util.invalidateTags([{ type: "Pages" }]));
  },
});
