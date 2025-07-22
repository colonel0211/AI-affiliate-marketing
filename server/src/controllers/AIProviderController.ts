import { Request, Response } from 'express';
import AIProvider from '../models/AIProvider';
import { AIProviderManager } from '../services/ai/AIProviderManager';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class AIProviderController {
  private aiProviderManager = new AIProviderManager();

  async getAllProviders(req: Request, res: Response) {
    try {
      const providers = await AIProvider.find().select('-apiKey');
      res.json(ApiResponse.success(providers));
    } catch (error) {
      logger.error('Error fetching AI providers:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch AI providers'));
    }
  }

  async getProvider(req: Request, res: Response) {
    try {
      const provider = await AIProvider.findById(req.params.id).select('-apiKey');
      if (!provider) {
        return res.status(404).json(ApiResponse.error('AI provider not found'));
      }
      res.json(ApiResponse.success(provider));
    } catch (error) {
      logger.error('Error fetching AI provider:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch AI provider'));
    }
  }

  async createProvider(req: Request, res: Response) {
    try {
      const provider = new AIProvider(req.body);
      await provider.save();
      
      // Remove API key from response
      const responseProvider = provider.toObject();
      delete responseProvider.apiKey;
      
      res.status(201).json(ApiResponse.success(responseProvider));
    } catch (error) {
      logger.error('Error creating AI provider:', error);
      res.status(500).json(ApiResponse.error('Failed to create AI provider'));
    }
  }

  async updateProvider(req: Request, res: Response) {
    try {
      const provider = await AIProvider.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select('-apiKey');
      
      if (!provider) {
        return res.status(404).json(ApiResponse.error('AI provider not found'));
      }
      
      res.json(ApiResponse.success(provider));
    } catch (error) {
      logger.error('Error updating AI provider:', error);
      res.status(500).json(ApiResponse.error('Failed to update AI provider'));
    }
  }

  async deleteProvider(req: Request, res: Response) {
    try {
      const provider = await AIProvider.findByIdAndDelete(req.params.id);
      if (!provider) {
        return res.status(404).json(ApiResponse.error('AI provider not found'));
      }
      res.json(ApiResponse.success({ message: 'AI provider deleted successfully' }));
    } catch (error) {
      logger.error('Error deleting AI provider:', error);
      res.status(500).json(ApiResponse.error('Failed to delete AI provider'));
    }
  }

  async testProvider(req: Request, res: Response) {
    try {
      const provider = await AIProvider.findById(req.params.id);
      if (!provider) {
        return res.status(404).json(ApiResponse.error('AI provider not found'));
      }

      // Mock test - replace with actual API test
      const testResult = {
        success: true,
        responseTime: Math.floor(Math.random() * 5000) + 1000,
        status: 'active'
      };

      await this.aiProviderManager.updateProviderUsage(
        provider._id.toString(),
        testResult.success,
        testResult.responseTime
      );

      res.json(ApiResponse.success(testResult));
    } catch (error) {
      logger.error('Error testing AI provider:', error);
      res.status(500).json(ApiResponse.error('Failed to test AI provider'));
    }
  }

  async resetQuotas(req: Request, res: Response) {
    try {
      await this.aiProviderManager.resetDailyQuotas();
      res.json(ApiResponse.success({ message: 'Daily quotas reset successfully' }));
    } catch (error) {
      logger.error('Error resetting quotas:', error);
      res.status(500).json(ApiResponse.error('Failed to reset quotas'));
    }
  }
}