import axios, { AxiosError, AxiosResponse } from 'axios';
import { Store } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { removeAuth } from '@/redux/authSlice';

// -------------------------------------------------------------------

let store: Store<RootState>;

export const injectStore = (_store: Store<RootState>) => {
  store = _store;
};

export const BASE_URL = '/api';

export interface Detail {
  refreshable?: boolean;
}

export interface ErrType {
  code: number;
  message: string;
  details?: Detail[];
}

// -------------------------------------------------------------------
// Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 6000,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ErrType>) => {
    if (!error.response) return Promise.reject(error.message);

    if (error.response.status === 401) {
      store.dispatch(removeAuth());
    }
    return Promise.reject(error.response.data.message);
  },
);

export default axiosInstance;
