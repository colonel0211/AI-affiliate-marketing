import { Request, Response } from 'express';
import Content from '../models/Content';
import { ContentGenerationService } from '../services/content/ContentGenerationService';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class ContentController {
  private contentService = new ContentGenerationService();

  async getAllContent(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, status, platform } = req.query;
      const filter: any = {};
      
      if (status) filter.status = status;
      if (platform) filter.platform = platform;

      const content = await Content.find(filter)
        .populate('campaignId', 'name platform')
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      const total = await Content.countDocuments(filter);

      res.json(ApiResponse.paginated(content, total, Number(page), Number(limit)));
    } catch (error) {
      logger.error('Error fetching content:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch content'));
    }
  }

  async getContent(req: Request, res: Response) {
    try {
      const content = await Content.findById(req.params.id).populate('campaignId');
      if (!content) {
        return res.status(404).json(ApiResponse.error('Content not found'));
      }
      res.json(ApiResponse.success(content));
    } catch (error) {
      logger.error('Error fetching content:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch content'));
    }
  }

  async createContent(req: Request, res: Response) {
    try {
      const content = new Content(req.body);
      await content.save();
      res.status(201).json(ApiResponse.success(content));
    } catch (error) {
      logger.error('Error creating content:', error);
      res.status(500).json(ApiResponse.error('Failed to create content'));
    }
  }

  async updateContent(req: Request, res: Response) {
    try {
      const content = await Content.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!content) {
        return res.status(404).json(ApiResponse.error('Content not found'));
      }
      
      res.json(ApiResponse.success(content));
    } catch (error) {
      logger.error('Error updating content:', error);
      res.status(500).json(ApiResponse.error('Failed to update content'));
    }
  }

  async deleteContent(req: Request, res: Response) {
    try {
      const content = await Content.findByIdAndDelete(req.params.id);
      if (!content) {
        return res.status(404).json(ApiResponse.error('Content not found'));
      }
      res.json(ApiResponse.success({ message: 'Content deleted successfully' }));
    } catch (error) {
      logger.error('Error deleting content:', error);
      res.status(500).json(ApiResponse.error('Failed to delete content'));
    }
  }

  async generateContent(req: Request, res: Response) {
    try {
      await this.contentService.generateContent();
      res.json(ApiResponse.success({ message: 'Content generation started' }));
    } catch (error) {
      logger.error('Error generating content:', error);
      res.status(500).json(ApiResponse.error('Failed to generate content'));
    }
  }

  async publishContent(req: Request, res: Response) {
    try {
      const content = await Content.findById(req.params.id);
      if (!content) {
        return res.status(404).json(ApiResponse.error('Content not found'));
      }

      // Trigger publishing process
      await this.contentService.publishContent();
      
      res.json(ApiResponse.success({ message: 'Content publishing started' }));
    } catch (error) {
      logger.error('Error publishing content:', error);
      res.status(500).json(ApiResponse.error('Failed to publish content'));
    }
  }
}