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
