import { Request, Response } from 'express';
import Content from '../models/Content';
import Campaign from '../models/Campaign';
import AIProvider from '../models/AIProvider';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class AnalyticsController {
  async getOverview(req: Request, res: Response) {
    try {
      const [
        totalCampaigns,
        activeCampaigns,
        totalContent,
        publishedContent,
        totalRevenue
      ] = await Promise.all([
        Campaign.countDocuments(),
        Campaign.countDocuments({ status: 'active' }),
        Content.countDocuments(),
        Content.countDocuments({ status: 'published' }),
        Content.aggregate([
          { $group: { _id: null, total: { $sum: '$revenue' } } }
        ])
      ]);

      const overview = {
        campaigns: {
          total: totalCampaigns,
          active: activeCampaigns
        },
        content: {
          total: totalContent,
          published: publishedContent
        },
        revenue: {
          total: totalRevenue[0]?.total || 0,
          monthly: totalRevenue[0]?.total || 0 // Simplified for demo
        }
      };

      res.json(ApiResponse.success(overview));
    } catch (error) {
      logger.error('Error fetching analytics overview:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch analytics overview'));
    }
  }

  async getRevenue(req: Request, res: Response) {
    try {
      const revenueData = await Content.aggregate([
        {
          $match: { status: 'published' }
        },
        {
          $group: {
            _id: {
              year: { $year: '$publishedAt' },
              month: { $month: '$publishedAt' },
              day: { $dayOfMonth: '$publishedAt' }
            },
            revenue: { $sum: '$revenue' },
            views: { $sum: '$views' },
            engagement: { $avg: '$engagement' }
          }
        },
        {
          $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 }
        }
      ]);

      res.json(ApiResponse.success(revenueData));
    } catch (error) {
      logger.error('Error fetching revenue analytics:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch revenue analytics'));
    }
  }

  async getContentPerformance(req: Request, res: Response) {
    try {
      const performance = await Content.aggregate([
        {
          $match: { status: 'published' }
        },
        {
          $group: {
            _id: '$platform',
            totalContent: { $sum: 1 },
            totalViews: { $sum: '$views' },
            totalRevenue: { $sum: '$revenue' },
            avgEngagement: { $avg: '$engagement' }
          }
        }
      ]);

      res.json(ApiResponse.success(performance));
    } catch (error) {
      logger.error('Error fetching content performance:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch content performance'));
    }
  }

  async getAIProviderStats(req: Request, res: Response) {
    try {
      const providers = await AIProvider.find().select('-apiKey');
      res.json(ApiResponse.success(providers));
    } catch (error) {
      logger.error('Error fetching AI provider stats:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch AI provider stats'));
    }
  }

  async getPlatformStats(req: Request, res: Response) {
    try {
      const stats = await Content.aggregate([
        {
          $group: {
            _id: '$platform',
            totalUploads: { $sum: 1 },
            successfulUploads: {
              $sum: { $cond: [{ $eq: ['$status', 'published'] }, 1, 0] }
            },
            totalViews: { $sum: '$views' },
            totalRevenue: { $sum: '$revenue' }
          }
        },
        {
          $addFields: {
            successRate: {
              $multiply: [
                { $divide: ['$successfulUploads', '$totalUploads'] },
                100
              ]
            }
          }
        }
      ]);

      res.json(ApiResponse.success(stats));
    } catch (error) {
      logger.error('Error fetching platform stats:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch platform stats'));
    }
  }
}