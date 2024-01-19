import { showNotification } from '@mantine/notifications';
import { completeNavigationProgress, startNavigationProgress } from '@mantine/nprogress';
import {
  fetchBaseQuery as RtkFetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

export const baseQuery = RtkFetchBaseQuery({
  baseUrl: 'https://e8x610zdrb.execute-api.eu-central-1.amazonaws.com/',
});

export const fetchBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  try {
    startNavigationProgress();
    const result = await baseQuery(args, api, extraOptions);
    completeNavigationProgress();

    if (result.error) {
      showNotification({
        title: 'Fetch Error',
        message: JSON.stringify(result.error),
        color: 'red',
        autoClose: false,
      });
    }

    return result;
  } catch (err) {
    console.log(err);
    completeNavigationProgress();
    throw err;
  }
};
