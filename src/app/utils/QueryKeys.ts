export const queryKeys = {
  main: {
    byId: (id: string) => ['main', id] as const,
    list: (filters?: any) => (filters ? (['list', filters] as const) : (['list'] as const)),
    detail: (id: string, section?: string) => (section ? (['detail', id, section] as const) : (['detail', id] as const)),
  },
};

/*
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
  
  const useFetchById = (id: string) => {
    return useQuery({
      queryKey: queryKeys.main.byId(id),
      queryFn: async () => {
        const response = await mainAxiosInstance.get(`/some-endpoint/${id}`);
        return response.data;
      },
      ...defaultQueryConfig,
    });
  };
  
  const useFetchList = (filters?: Record<string, any>) => {
    return useQuery({
      queryKey: queryKeys.main.list(filters),
      queryFn: async () => {
        const response = await mainAxiosInstance.get('/some-endpoint', { params: filters });
        return response.data;
      },
      ...defaultQueryConfig,
    });
  };
  */
