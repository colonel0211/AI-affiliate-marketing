import { useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

export function useApi<T>(
  apiCall: () => Promise<any>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiCall();
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Specific hooks for common API calls
export function useCampaigns() {
  return useApi(() => apiClient.getCampaigns());
}

export function useContent(params?: any) {
  return useApi(() => apiClient.getContent(params), [params]);
}

export function useAIProviders() {
  return useApi(() => apiClient.getAIProviders());
}

export function useSystemStatus() {
  return useApi(() => apiClient.getSystemStatus());
}

export function useAnalyticsOverview() {
  return useApi(() => apiClient.getAnalyticsOverview());
}