import AIProvider from '../../models/AIProvider';
import { logger } from '../../utils/logger';

export class AIProviderManager {
  async getAvailableProvider(type: 'image' | 'video' | 'voice' | 'text') {
    try {
      // Find active providers with available quota
      const providers = await AIProvider.find({
        type,
        status: { $in: ['active', 'standby'] },
        $expr: { $lt: ['$usageToday', '$dailyLimit'] }
      }).sort({ quality: -1, successRate: -1 });

      if (providers.length === 0) {
        throw new Error(`No available ${type} providers`);
      }

      // Return the best available provider
      const provider = providers[0];
      
      // Update status to active if it was on standby
      if (provider.status === 'standby') {
        provider.status = 'active';
        await provider.save();
      }

      return provider;
    } catch (error) {
      logger.error(`Error getting available ${type} provider:`, error);
      throw error;
    }
  }

  async updateProviderUsage(providerId: string, success: boolean, responseTime: number) {
    try {
      const provider = await AIProvider.findById(providerId);
      if (!provider) return;

      provider.usageToday += 1;
      provider.lastUsed = new Date();

      // Update success rate
      const totalRequests = provider.usageToday;
      const currentSuccessRate = provider.successRate;
      const newSuccessRate = success 
        ? ((currentSuccessRate * (totalRequests - 1)) + 100) / totalRequests
        : ((currentSuccessRate * (totalRequests - 1)) + 0) / totalRequests;
      
      provider.successRate = Math.round(newSuccessRate * 100) / 100;

      // Update average response time
      provider.avgResponseTime = ((provider.avgResponseTime * (totalRequests - 1)) + responseTime) / totalRequests;

      // Check if quota is reached
      if (provider.usageToday >= provider.dailyLimit) {
        provider.status = 'quota_reached';
      }

      await provider.save();
      logger.info(`Updated usage for provider ${provider.name}: ${provider.usageToday}/${provider.dailyLimit}`);
    } catch (error) {
      logger.error('Error updating provider usage:', error);
    }
  }

  async resetDailyQuotas() {
    try {
      const result = await AIProvider.updateMany(
        {},
        {
          $set: {
            usageToday: 0,
            status: 'standby',
            resetTime: new Date()
          }
        }
      );

      logger.info(`Reset daily quotas for ${result.modifiedCount} providers`);
    } catch (error) {
      logger.error('Error resetting daily quotas:', error);
    }
  }

  async initializeProviders() {
    try {
      const providers = [
        // Image providers
        { name: 'DALL-E 3', type: 'image', baseUrl: 'https://api.openai.com/v1/images/generations', dailyLimit: 50, quality: 9.4 },
        { name: 'Stable Diffusion', type: 'image', baseUrl: 'https://api.stability.ai/v1/generation', dailyLimit: 1000, quality: 8.6 },
        { name: 'Midjourney', type: 'image', baseUrl: 'https://api.midjourney.com/v1/imagine', dailyLimit: 25, quality: 9.7 },
        
        // Video providers
        { name: 'Runway ML', type: 'video', baseUrl: 'https://api.runwayml.com/v1/generate', dailyLimit: 100, quality: 8.9 },
        { name: 'Stable Video', type: 'video', baseUrl: 'https://api.stability.ai/v1/video', dailyLimit: 25, quality: 8.4 },
        
        // Voice providers
        { name: 'ElevenLabs', type: 'voice', baseUrl: 'https://api.elevenlabs.io/v1/text-to-speech', dailyLimit: 10000, quality: 9.6 },
        { name: 'Murf AI', type: 'voice', baseUrl: 'https://api.murf.ai/v1/speech', dailyLimit: 120, quality: 8.9 },
        
        // Text providers
        { name: 'GPT-4 Turbo', type: 'text', baseUrl: 'https://api.openai.com/v1/chat/completions', dailyLimit: 1000, quality: 9.8 },
        { name: 'Claude 3.5', type: 'text', baseUrl: 'https://api.anthropic.com/v1/messages', dailyLimit: 500, quality: 9.6 },
        { name: 'Gemini Pro', type: 'text', baseUrl: 'https://generativelanguage.googleapis.com/v1/models', dailyLimit: 1000, quality: 9.2 }
      ];

      for (const providerData of providers) {
        await AIProvider.findOneAndUpdate(
          { name: providerData.name },
          providerData,
          { upsert: true, new: true }
        );
      }

      logger.info(`Initialized ${providers.length} AI providers`);
    } catch (error) {
      logger.error('Error initializing AI providers:', error);
    }
  }
}