const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Campaign methods
  async getCampaigns() {
    return this.request('/campaigns');
  }

  async createCampaign(campaignData: any) {
    return this.request('/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  async updateCampaign(id: string, campaignData: any) {
    return this.request(`/campaigns/${id}`, {
      method: 'PUT',
      body: JSON.stringify(campaignData),
    });
  }

  async deleteCampaign(id: string) {
    return this.request(`/campaigns/${id}`, {
      method: 'DELETE',
    });
  }

  async startCampaign(id: string) {
    return this.request(`/campaigns/${id}/start`, {
      method: 'POST',
    });
  }

  async pauseCampaign(id: string) {
    return this.request(`/campaigns/${id}/pause`, {
      method: 'POST',
    });
  }

  // Content methods
  async getContent(params?: any) {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request(`/content${queryString}`);
  }

  async generateContent() {
    return this.request('/content/generate', {
      method: 'POST',
    });
  }

  async publishContent(id: string) {
    return this.request(`/content/${id}/publish`, {
      method: 'POST',
    });
  }

  // Social media methods
  async getYouTubeTrending() {
    return this.request('/social/youtube/trending');
  }

  async getInstagramTrending() {
    return this.request('/social/instagram/trending');
  }

  async getTikTokTrending() {
    return this.request('/social/tiktok/trending');
  }

  async getPlatformStatus() {
    return this.request('/social/status');
  }

  // AI Provider methods
  async getAIProviders() {
    return this.request('/ai-providers');
  }

  async testAIProvider(id: string) {
    return this.request(`/ai-providers/${id}/test`, {
      method: 'POST',
    });
  }

  async resetAIProviderQuotas() {
    return this.request('/ai-providers/reset-quotas', {
      method: 'POST',
    });
  }

  // Analytics methods
  async getAnalyticsOverview() {
    return this.request('/analytics/overview');
  }

  async getRevenueAnalytics() {
    return this.request('/analytics/revenue');
  }

  async getContentPerformance() {
    return this.request('/analytics/content-performance');
  }

  async getPlatformStats() {
    return this.request('/analytics/platform-stats');
  }

  // Scraping methods
  async getAllTrendingContent(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/scraping/trending${params}`);
  }

  async scrapeYouTube(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/scraping/youtube${params}`);
  }

  async scrapeInstagram(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/scraping/instagram${params}`);
  }

  async scrapeTikTok(limit?: number) {
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`/scraping/tiktok${params}`);
  }

  async getScrapingServiceStatus() {
    return this.request('/scraping/services/status');
  }

  async testScrapingServices() {
    return this.request('/scraping/services/test', {
      method: 'POST',
    });
  }

  // System methods
  async getSystemStatus() {
    return this.request('/system/status');
  }

  async getSystemMetrics() {
    return this.request('/system/metrics');
  }

  async startSystem() {
    return this.request('/system/start', {
      method: 'POST',
    });
  }

  async stopSystem() {
    return this.request('/system/stop', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();