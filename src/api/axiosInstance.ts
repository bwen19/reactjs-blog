import axios, { AxiosError, AxiosResponse } from 'axios';

// -------------------------------------------------------------------

export const BASE_URL = '/api';

export interface Detail {
  refreshable?: boolean;
}

export interface ErrType {
  code: number;
  message: string;
  details?: Detail[];
}

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

    return Promise.reject(error.response.data.message);
  },
);

export default axiosInstance;
