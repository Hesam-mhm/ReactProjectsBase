import { toast } from 'react-hot-toast';

export const requestsConstants = {
  baseUrl: import.meta.env.DEV,
  timeout: 60000,
  retryCount: 3,
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
};

export const getCommonHeaders = () => {
  const token = localStorage.getItem('Token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};

export const handleError = (error: any) => {
  const message = error?.response?.data?.message || 'خطایی رخ داده است';
  switch (error?.response?.status) {
    case 400:
      toast.error('درخواست نامعتبر است');
      break;
    case 401:
      toast.error('لطفاً دوباره وارد شوید');
      window.dispatchEvent(new CustomEvent('-auth-error', { detail: { status: 401 } }));
      break;
    case 403:
      toast.error('شما دسترسی لازم را ندارید');
      break;
    case 404:
      toast.error('منبع مورد نظر یافت نشد');
      break;
    case 500:
      toast.error('خطای سرور. لطفاً بعداً تلاش کنید');
      break;
    default:
      toast.error(message);
  }
  return Promise.reject(error);
};

export const handleSuccess = (data: any) => {
  if (data?.message) {
    toast.success(data.message);
  }
};
