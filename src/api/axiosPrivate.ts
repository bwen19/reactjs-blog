import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Store } from '@reduxjs/toolkit';

import { getToken } from '@/utils/localStorage';
import { RootState } from '@/redux/store';
import { setToken } from '@/redux/authSlice';
import { BASE_URL, ErrType } from './axiosInstance';
import { refresh } from './auth';

// -------------------------------------------------------------------

let store: Store<RootState>;

export const injectStorePrivate = (_store: Store<RootState>) => {
  store = _store;
};

// Request Queue
interface IRequestQueue {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
const requestQueue: IRequestQueue[] = [];

const processQueue = (error: any, token: string) => {
  requestQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
};

// -------------------------------------------------------------------
// Private Axios
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

// Request interceptor
axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? { 'Content-Type': 'application/json' };
    config.headers.Authorization = store.getState().auth.accessToken;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
axiosPrivate.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ErrType>) => {
    if (!error.response) return Promise.reject(error.message);

    const prevRequest = error.config;

    let refreshable: boolean = false;
    if (error.response.data?.details) {
      refreshable = error.response.data.details[0].refreshable ?? false;
    }

    if (error.response.status === 401 && refreshable && !prevRequest.headers!.hasSent) {
      prevRequest.headers!.hasSent = true;

      if (isRefreshing) {
        return new Promise((resolve: (token: string) => void, reject) => {
          requestQueue.push({ resolve, reject });
        })
          .then((token) => {
            prevRequest.headers!.Authorization = token;
            return axiosPrivate(prevRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;
      const refreshToken = getToken();
      return new Promise((resolve, reject) => {
        refresh({ refreshToken })
          .then(({ data }) => {
            store.dispatch(setToken(data.accessToken));
            processQueue(null, data.accessToken);
            resolve(axiosPrivate(prevRequest));
          })
          .catch((err) => {
            processQueue(err, '');
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error.response.data.message);
  },
);

export default axiosPrivate;
