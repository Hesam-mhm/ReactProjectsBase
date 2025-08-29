API Configuration Documentation
This document outlines the configuration and usage of Axios and React Query in a Vite-based project for handling API requests to a single service (main) with environment-specific Base URLs. The setup is designed to manage API requests efficiently, handle errors and success messages consistently, and support development and production environments using environment variables.
Table of Contents

Overview
File Structure
Environment Variables Setup
Axios Configuration
React Query Configuration
Usage Examples
Testing Environments
Security Notes
Adding New Services

Overview
The project uses Axios for making HTTP requests and React Query for managing server state. The configuration supports:

Environment-specific Base URLs using Vite's environment variable system (.env.development and .env.production).
Centralized error and success handling with react-hot-toast for user notifications.
Proxy setup in development to avoid CORS issues.
Consistent retry logic and timeout settings across Axios and React Query.

File Structure
The relevant configuration files are:

vite.config.ts: Configures Vite, including environment variable loading and proxy settings.
src/configs/baseUrls.ts: Defines the Base URL for the main service, loaded from environment variables.
src/configs/settings.ts: Contains shared constants, headers, and error/success handlers.
src/services/axiosInstances.ts: Creates an Axios instance for the main service with interceptors for logging, error handling, and retries.
src/services/reactQueryConfig.ts: Configures React Query with default options for queries and mutations.

Environment Variables Setup
The project uses Vite's environment variable system to manage Base URLs for different environments.
.env.development
VITE_MAIN_API_URL=https://dev.frappe.io

.env.production
VITE_MAIN_API_URL=https://api.frappe.io

Notes

Prefix: Variables must start with VITE\_ to be accessible in the client (via import.meta.env).
Default: If VITE_MAIN_API_URL is not defined, https://staging.frappe.io is used as a fallback (defined in baseUrls.ts).
Security: Ensure .env files are added to .gitignore to prevent sensitive data from being committed.
Reload: After modifying .env files, restart the Vite server (npm run dev) to load changes.

Axios Configuration
The axiosInstances.ts file creates an Axios instance for the main service with the following features:

Base URL:
Development: Uses /api/main (proxied to https://dev.frappe.io via vite.config.ts).
Production: Uses https://api.frappe.io directly.

Timeout: 60 seconds (defined in settings.ts).
Retries: Up to 3 retries for network errors or server errors (502, 503, 504) using axios-retry.
Headers: Includes Content-Type: application/json, Authorization: Bearer <token> (if available), and X-Timezone.
Interceptors:
Request: Logs requests in development and merges common headers.
Response: Logs responses in development, handles success messages with react-hot-toast, and displays offline errors.

Error Handling: Centralized error handling with user-friendly messages for common HTTP status codes (400, 401, 403, 404, 500).

Example (axiosInstances.ts)
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
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
retryDelay: (retryCount) => Math.min(1000 \* 2 \*\* retryCount, 30000),
retryCondition: (error) => {
return !error.response || [502, 503, 504].includes(error.response?.status);
},
});

instance.interceptors.request.use(
(config: InternalAxiosRequestConfig) => {
if (import.meta.env.DEV) {
console.log(`[Axios Request] ${service} ${config.method?.toUpperCase()} ${config.url}`, config.data);
}
config.headers = AxiosHeaders.from({ ...config.headers, ...getCommonHeaders() });
return config;
},
handleError,
);

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
toast.error('You are offline. Please check your internet connection.');
}
return handleError(error);
},
);

return instance;
};

export const mainAxiosInstance = createAxiosInstance(baseUrls.main, 'main');

React Query Configuration
The reactQueryConfig.ts file configures React Query for managing server state with the following features:

Default Options:
Queries: Refetch on window focus is enabled, with up to 3 retries (except for 401, 403, 404 errors), and configurable stale and garbage collection times.
Mutations: Centralized error and success handling with loading and dismissal toasts.

Custom Configurations:
defaultQueryConfig: For individual queries with no refetch on focus.
defaultMutationConfig: Includes loading toasts on mutation start and dismissal on completion.
defaultInfiniteQueryConfig: For infinite scrolling with pagination support.

Example (reactQueryConfig.ts)
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { requestsConstants, handleError, handleSuccess } from './settings';

export const queryClient = new QueryClient({
defaultOptions: {
queries: {
refetchOnWindowFocus: true,
retry: (failureCount, error: any) => {
if ([401, 403, 404].includes(error?.response?.status)) {
return false;
}
return failureCount < requestsConstants.retryCount;
},
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
},
mutations: {
onError: handleError,
onSuccess: handleSuccess,
},
},
});

export const defaultQueryConfig = {
refetchOnWindowFocus: false,
retry: requestsConstants.retryCount,
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
select: (data: any) => data?.results || data,
};

export const defaultMutationConfig = {
onError: handleError,
onSuccess: handleSuccess,
onMutate: async () => {
toast.loading('Processing operation...');
},
onSettled: () => {
toast.dismiss();
},
};

export const defaultInfiniteQueryConfig = {
getNextPageParam: (lastPage: any, allPages: any[]) => {
return lastPage.nextPage ? allPages.length + 1 : undefined;
},
refetchOnWindowFocus: false,
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
};

Usage Examples
Direct Axios Request
import { mainAxiosInstance } from './services/axiosInstances';

const fetchData = async () => {
try {
const response = await mainAxiosInstance.get('/some-endpoint');
return response.data;
} catch (error) {
console.error('Failed to fetch:', error);
throw error;
}
};

React Query Usage
import { useQuery } from '@tanstack/react-query';
import { mainAxiosInstance } from './services/axiosInstances';
import { defaultQueryConfig } from './reactQueryConfig';
import { queryKeys } from './queryKeys';

const useFetchData = () => {
return useQuery({
queryKey: queryKeys.main.all,
queryFn: async () => {
const response = await mainAxiosInstance.get('/some-endpoint');
return response.data;
},
...defaultQueryConfig,
});
};

Query Key Factory
// utils/queryKeys.ts
export const queryKeys = {
main: {
all: ['main'],
byId: (id: string) => ['main', id],
},
};

Testing Environments
Development
npm run dev

Loads .env.development with VITE_MAIN_API_URL=https://dev.frappe.io.
Requests to /api/main are proxied to https://dev.frappe.io (configured in vite.config.ts).

Production
npm run build && npm run preview

Loads .env.production with VITE_MAIN_API_URL=https://api.frappe.io.
Requests go directly to https://api.frappe.io.

Security Notes

Environment Variables: Only expose necessary variables with the VITE\_ prefix in .env files. Sensitive data (e.g., API keys) should be managed server-side or via a proxy.
CORS: The proxy in vite.config.ts handles CORS issues in development. In production, ensure servers are configured to allow requests from your domain.
Tokens: Tokens are stored in localStorage with keys like Token. Consider using secure alternatives (e.g., HttpOnly cookies) for sensitive tokens.

Adding New Services
To add a new service (e.g., analytics):

Add the new Base URL to .env.development and .env.production:# .env.development
VITE_ANALYTICS_API_URL=https://dev.analytics.example.com

# .env.production

VITE_ANALYTICS_API_URL=https://analytics.example.com

Update baseUrls.ts:interface BaseUrls {
main: string;
analytics: string;
}

const getBaseUrls = (): BaseUrls => {
return {
main: import.meta.env.VITE_MAIN_API_URL || 'https://staging.frappe.io',
analytics: import.meta.env.VITE_ANALYTICS_API_URL || 'https://staging.analytics.example.com',
};
};

Add a new Axios instance in axiosInstances.ts:export const analyticsAxiosInstance = createAxiosInstance(baseUrls.analytics, 'analytics');

Update vite.config.ts to include a proxy for the new service:server: {
proxy: {
'/api/analytics': {
target: env.VITE_ANALYTICS_API_URL,
changeOrigin: true,
rewrite: (path) => path.replace(/^\/api\/analytics/, ''),
},
},
},

Update queryKeys.ts for React Query:export const queryKeys = {
main: { all: ['main'], byId: (id: string) => ['main', id] },
analytics: { all: ['analytics'], byId: (id: string) => ['analytics', id] },
};

---

مستندات تنظیمات API
این مستند نحوه تنظیم و استفاده از Axios و React Query را در یک پروژه مبتنی بر Vite برای مدیریت درخواست‌های API به سرویس main توضیح می‌دهد. این تنظیمات برای مدیریت Base URLهای مختلف در محیط‌های توسعه و تولید، استفاده از متغیرهای محیطی، و مدیریت خطاها و پیام‌های موفقیت طراحی شده‌اند.
فهرست مطالب

نمای کلی
ساختار فایل‌ها
تنظیم متغیرهای محیطی
تنظیمات Axios
تنظیمات React Query
نمونه‌های استفاده
تست محیط‌های مختلف
نکات امنیتی
افزودن سرویس جدید

نمای کلی
این پروژه از Axios برای ارسال درخواست‌های HTTP و React Query برای مدیریت حالت سرور استفاده می‌کند. ویژگی‌های کلیدی عبارتند از:

مدیریت Base URLهای خاص برای محیط‌های توسعه و تولید با استفاده از متغیرهای محیطی Vite (فایل‌های .env.development و .env.production).
مدیریت متمرکز خطاها و پیام‌های موفقیت با استفاده از react-hot-toast.
تنظیم پراکسی در محیط توسعه برای جلوگیری از مشکلات CORS.
تنظیمات یکپارچه برای تعداد تلاش‌های مجدد (retry) و زمان‌بندی‌ها در Axios و React Query.

ساختار فایل‌ها
فایل‌های مرتبط عبارتند از:

vite.config.ts: تنظیمات Vite، شامل لود متغیرهای محیطی و تنظیم پراکسی.
src/configs/baseUrls.ts: تعریف Base URL برای سرویس main با استفاده از متغیرهای محیطی.
src/configs/settings.ts: شامل ثابت‌ها، هدرها، و توابع مدیریت خطا و موفقیت.
src/services/axiosInstances.ts: ایجاد نمونه Axios برای سرویس main با interceptorها برای لاگ، مدیریت خطا، و تلاش‌های مجدد.
src/services/reactQueryConfig.ts: تنظیمات React Query برای مدیریت کوئری‌ها و موتیشن‌ها.

تنظیم متغیرهای محیطی
پروژه از سیستم متغیرهای محیطی Vite برای مدیریت Base URLها استفاده می‌کند.
فایل .env.development
VITE_MAIN_API_URL=https://dev.frappe.io

فایل .env.production
VITE_MAIN_API_URL=https://api.frappe.io

نکات

پیشوند: متغیرها باید با VITE\_ شروع شوند تا در کلاینت (مرورگر) در دسترس باشند (از طریق import.meta.env).
مقدار پیش‌فرض: اگر VITE_MAIN_API_URL تعریف نشده باشد، مقدار پیش‌فرض https://staging.frappe.io در baseUrls.ts استفاده می‌شود.
امنیت: فایل‌های .env را به .gitignore اضافه کنید تا داده‌های حساس به مخزن git نرن.
ری‌استارت: پس از تغییر فایل‌های .env، سرور Vite را با npm run dev ری‌استارت کنید.

تنظیمات Axios
فایل axiosInstances.ts یک نمونه Axios برای سرویس main ایجاد می‌کند با ویژگی‌های زیر:

Base URL:
توسعه: از /api/main استفاده می‌کند (که از طریق پراکسی در vite.config.ts به https://dev.frappe.io هدایت می‌شود).
تولید: مستقیماً از https://api.frappe.io استفاده می‌کند.

تایم‌اوت: 60 ثانیه (تعریف‌شده در settings.ts).
تلاش‌های مجدد: تا 3 تلاش مجدد برای خطاهای شبکه یا سرور (502، 503، 504) با استفاده از axios-retry.
هدرها: شامل Content-Type: application/json، Authorization: Bearer <token> (در صورت وجود)، و X-Timezone.
Interceptorها:
درخواست: لاگ درخواست‌ها در محیط توسعه و ادغام هدرهای مشترک.
پاسخ: لاگ پاسخ‌ها در محیط توسعه، مدیریت پیام‌های موفقیت با react-hot-toast، و نمایش خطای آفلاین.

مدیریت خطا: مدیریت متمرکز خطاها با پیام‌های کاربرپسند برای کدهای HTTP (400، 401، 403، 404، 500).

نمونه کد (axiosInstances.ts)
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
retryDelay: (retryCount) => Math.min(1000 \* 2 \*\* retryCount, 30000),
retryCondition: (error) => {
return !error.response || [502, 503, 504].includes(error.response?.status);
},
});

instance.interceptors.request.use(
(config: InternalAxiosRequestConfig) => {
if (import.meta.env.DEV) {
console.log(`[Axios Request] ${service} ${config.method?.toUpperCase()} ${config.url}`, config.data);
}
config.headers = AxiosHeaders.from({ ...config.headers, ...getCommonHeaders() });
return config;
},
handleError,
);

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

تنظیمات React Query
فایل reactQueryConfig.ts تنظیمات React Query را برای مدیریت حالت سرور فراهم می‌کند با ویژگی‌های زیر:

تنظیمات پیش‌فرض:
کوئری‌ها: رفرش خودکار هنگام فوکوس پنجره فعال است، با حداکثر 3 تلاش مجدد (به‌جز خطاهای 401، 403، 404)، و زمان‌های stale و garbage collection قابل تنظیم.
موتیشن‌ها: مدیریت متمرکز خطاها و پیام‌های موفقیت با نمایش لودر در شروع و حذف آن در پایان.

تنظیمات سفارشی:
defaultQueryConfig: برای کوئری‌های جداگانه بدون رفرش خودکار.
defaultMutationConfig: شامل نمایش لودر در شروع موتیشن و حذف آن در پایان.
defaultInfiniteQueryConfig: برای اسکرول بی‌نهایت با پشتیبانی از صفحه‌بندی.

نمونه کد (reactQueryConfig.ts)
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { requestsConstants, handleError, handleSuccess } from './settings';

export const queryClient = new QueryClient({
defaultOptions: {
queries: {
refetchOnWindowFocus: true,
retry: (failureCount, error: any) => {
if ([401, 403, 404].includes(error?.response?.status)) {
return false;
}
return failureCount < requestsConstants.retryCount;
},
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
},
mutations: {
onError: handleError,
onSuccess: handleSuccess,
},
},
});

export const defaultQueryConfig = {
refetchOnWindowFocus: false,
retry: requestsConstants.retryCount,
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
select: (data: any) => data?.results || data,
};

export const defaultMutationConfig = {
onError: handleError,
onSuccess: handleSuccess,
onMutate: async () => {
toast.loading('در حال انجام عملیات...');
},
onSettled: () => {
toast.dismiss();
},
};

export const defaultInfiniteQueryConfig = {
getNextPageParam: (lastPage: any, allPages: any[]) => {
return lastPage.nextPage ? allPages.length + 1 : undefined;
},
refetchOnWindowFocus: false,
staleTime: requestsConstants.staleTime,
gcTime: requestsConstants.gcTime,
};

نمونه‌های استفاده
درخواست مستقیم با Axios
import { mainAxiosInstance } from './services/axiosInstances';

const fetchData = async () => {
try {
const response = await mainAxiosInstance.get('/some-endpoint');
return response.data;
} catch (error) {
console.error('خطا در دریافت داده:', error);
throw error;
}
};

استفاده در React Query
import { useQuery } from '@tanstack/react-query';
import { mainAxiosInstance } from './services/axiosInstances';
import { defaultQueryConfig } from './reactQueryConfig';
import { queryKeys } from './queryKeys';

const useFetchData = () => {
return useQuery({
queryKey: queryKeys.main.all,
queryFn: async () => {
const response = await mainAxiosInstance.get('/some-endpoint');
return response.data;
},
...defaultQueryConfig,
});
};

Query Key Factory
// utils/queryKeys.ts
export const queryKeys = {
main: {
all: ['main'],
byId: (id: string) => ['main', id],
},
};

تست محیط‌های مختلف
محیط توسعه
npm run dev

فایل .env.development لود می‌شود (VITE_MAIN_API_URL=https://dev.frappe.io).
درخواست‌ها به /api/main از طریق پراکسی به https://dev.frappe.io هدایت می‌شوند.

محیط تولید
npm run build && npm run preview

فایل .env.production لود می‌شود (VITE_MAIN_API_URL=https://api.frappe.io).
درخواست‌ها مستقیماً به https://api.frappe.io ارسال می‌شوند.

نکات امنیتی

متغیرهای محیطی: فقط متغیرهای با پیشوند VITE* در کلاینت در دسترس باشند. داده‌های حساس (مثل کلیدهای API) را بدون پیشوند VITE* تعریف کنید و در سمت سرور مدیریت کنید.
CORS: پراکسی در vite.config.ts مشکلات CORS را در توسعه حل می‌کند. در تولید، مطمئن شوید سرورها برای دامنه شما تنظیمات CORS مناسب دارند.
توکن‌ها: توکن‌ها با کلید Token در localStorage ذخیره می‌شوند. برای امنیت بیشتر، از کوکی‌های HttpOnly یا روش‌های امن‌تر استفاده کنید.

افزودن سرویس جدید
برای افزودن سرویس جدید (مثل analytics):

Base URL جدید را به فایل‌های .env.development و .env.production اضافه کنید:# .env.development
VITE_ANALYTICS_API_URL=https://dev.analytics.example.com

# .env.production

VITE_ANALYTICS_API_URL=https://analytics.example.com

فایل baseUrls.ts را به‌روزرسانی کنید:interface BaseUrls {
main: string;
analytics: string;
}

const getBaseUrls = (): BaseUrls => {
return {
main: import.meta.env.VITE_MAIN_API_URL || 'https://staging.frappe.io',
analytics: import.meta.env.VITE_ANALYTICS_API_URL || 'https://staging.analytics.example.com',
};
};

نمونه Axios جدید را در axiosInstances.ts اضافه کنید:export const analyticsAxiosInstance = createAxiosInstance(baseUrls.analytics, 'analytics');
