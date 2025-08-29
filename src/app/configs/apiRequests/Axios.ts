import axios, { AxiosError, AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { toast } from 'react-hot-toast';
import baseUrls from './BaseUrls';
import { getCommonHeaders, handleError, handleSuccess } from './settings';
import { requestsConstants } from './settings';

const createAxiosInstance = (baseURL: string, service: 'main') => {
  const instance = axios.create({
    baseURL: requestsConstants.baseUrl ? `/api/${service}` : baseURL,
    timeout: requestsConstants.timeout,
    headers: getCommonHeaders(),
  });

  axiosRetry(instance, {
    retries: requestsConstants.retryCount,
    retryDelay: (retryCount) => Math.min(1000 * 2 ** retryCount, 30000),
    retryCondition: (error) => {
      return !error.response || [502, 503, 504].includes(error.response?.status);
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (import.meta.env.DEV) {
      console.log(`[Axios Request] ${service} ${config.method?.toUpperCase()} ${config.url}`, config.data);
    }
    config.headers = AxiosHeaders.from({ ...config.headers, ...getCommonHeaders() });
    return config;
  }, handleError);

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (import.meta.env.DEV) {
        console.log(`[Axios Response] ${service} ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
      }
      handleSuccess(response.data);
      return response;
    },
    async (error: AxiosError) => {
      if (!navigator.onLine) {
        toast.error('شما آفلاین هستید. لطفاً اتصال اینترنت خود را بررسی کنید.');
      }
      return handleError(error);
    },
  );

  return instance;
};

export const mainAxiosInstance = createAxiosInstance(baseUrls.main, 'main');
