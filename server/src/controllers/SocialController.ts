import { Request, Response } from 'express';
import { YouTubeService } from '../services/social/YouTubeService';
import { InstagramService } from '../services/social/InstagramService';
import { TikTokService } from '../services/social/TikTokService';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class SocialController {
  private youtubeService = new YouTubeService();
  private instagramService = new InstagramService();
  private tiktokService = new TikTokService();

  // YouTube methods
  async getYouTubeTrending(req: Request, res: Response) {
    try {
      const trending = await this.youtubeService.getTrendingVideos();
      res.json(ApiResponse.success(trending));
    } catch (error) {
      logger.error('Error fetching YouTube trending:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch YouTube trending'));
    }
  }

  async uploadToYouTube(req: Request, res: Response) {
    try {
      const { title, description, videoPath, tags } = req.body;
      const result = await this.youtubeService.uploadVideo({
        title,
        description,
        videoPath,
        tags
      });
      res.json(ApiResponse.success(result));
    } catch (error) {
      logger.error('Error uploading to YouTube:', error);
      res.status(500).json(ApiResponse.error('Failed to upload to YouTube'));
    }
  }

  async getYouTubeAnalytics(req: Request, res: Response) {
    try {
      const { videoId } = req.params;
      const analytics = await this.youtubeService.getVideoAnalytics(videoId);
      res.json(ApiResponse.success(analytics));
    } catch (error) {
      logger.error('Error fetching YouTube analytics:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch YouTube analytics'));
    }
  }

  // Instagram methods
  async getInstagramTrending(req: Request, res: Response) {
    try {
      const trending = await this.instagramService.getTrendingContent();
      res.json(ApiResponse.success(trending));
    } catch (error) {
      logger.error('Error fetching Instagram trending:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch Instagram trending'));
    }
  }

  async uploadToInstagram(req: Request, res: Response) {
    try {
      const { caption, mediaPath, mediaType } = req.body;
      const result = await this.instagramService.uploadContent({
        caption,
        mediaPath,
        mediaType
      });
      res.json(ApiResponse.success(result));
    } catch (error) {
      logger.error('Error uploading to Instagram:', error);
      res.status(500).json(ApiResponse.error('Failed to upload to Instagram'));
    }
  }

  async getInstagramAnalytics(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const analytics = await this.instagramService.getPostAnalytics(postId);
      res.json(ApiResponse.success(analytics));
    } catch (error) {
      logger.error('Error fetching Instagram analytics:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch Instagram analytics'));
    }
  }

  // TikTok methods
  async getTikTokTrending(req: Request, res: Response) {
    try {
      const trending = await this.tiktokService.getTrendingVideos();
      res.json(ApiResponse.success(trending));
    } catch (error) {
      logger.error('Error fetching TikTok trending:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch TikTok trending'));
    }
  }

  async uploadToTikTok(req: Request, res: Response) {
    try {
      const { caption, videoPath, hashtags } = req.body;
      const result = await this.tiktokService.uploadVideo({
        caption,
        videoPath,
        hashtags
      });
      res.json(ApiResponse.success(result));
    } catch (error) {
      logger.error('Error uploading to TikTok:', error);
      res.status(500).json(ApiResponse.error('Failed to upload to TikTok'));
    }
  }

  async getTikTokAnalytics(req: Request, res: Response) {
    try {
      const { videoId } = req.params;
      const analytics = await this.tiktokService.getVideoAnalytics(videoId);
      res.json(ApiResponse.success(analytics));
    } catch (error) {
      logger.error('Error fetching TikTok analytics:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch TikTok analytics'));
    }
  }

  async getPlatformStatus(req: Request, res: Response) {
    try {
      const status = {
        youtube: await this.youtubeService.getStatus(),
        instagram: await this.instagramService.getStatus(),
        tiktok: await this.tiktokService.getStatus()
      };
      res.json(ApiResponse.success(status));
    } catch (error) {
      logger.error('Error fetching platform status:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch platform status'));
    }
  }
}