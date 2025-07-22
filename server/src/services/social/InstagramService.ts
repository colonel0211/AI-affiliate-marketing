import axios from 'axios';
import { logger } from '../../utils/logger';

export class InstagramService {
  private accessToken: string;
  private baseUrl = 'https://graph.instagram.com';

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || '';
  }

  async getTrendingContent() {
    try {
      // Using Instagram Basic Display API to get trending content
      // Note: This is a simplified implementation - real trending detection would require more sophisticated analysis
      const response = await axios.get(`${this.baseUrl}/me/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
          access_token: this.accessToken
        }
      });

      const trendingContent = response.data.data
        .filter((post: any) => post.like_count >= 1000) // Filter for high engagement
        .map((post: any) => ({
          id: post.id,
          caption: post.caption,
          mediaType: post.media_type,
          mediaUrl: post.media_url,
          thumbnailUrl: post.thumbnail_url,
          permalink: post.permalink,
          timestamp: post.timestamp,
          likeCount: post.like_count,
          commentCount: post.comments_count
        }));

      logger.info(`Found ${trendingContent.length} trending Instagram posts`);
      return trendingContent;
    } catch (error) {
      logger.error('Error fetching Instagram trending content:', error);
      throw error;
    }
  }

  async uploadContent(contentData: {
    caption: string;
    mediaPath: string;
    mediaType: 'IMAGE' | 'VIDEO';
  }) {
    try {
      const { caption, mediaPath, mediaType } = contentData;

      // Step 1: Create media object
      const createResponse = await axios.post(`${this.baseUrl}/me/media`, {
        image_url: mediaType === 'IMAGE' ? mediaPath : undefined,
        video_url: mediaType === 'VIDEO' ? mediaPath : undefined,
        caption,
        access_token: this.accessToken
      });

      const creationId = createResponse.data.id;

      // Step 2: Publish media object
      const publishResponse = await axios.post(`${this.baseUrl}/me/media_publish`, {
        creation_id: creationId,
        access_token: this.accessToken
      });

      logger.info(`Content uploaded to Instagram: ${publishResponse.data.id}`);
      return {
        postId: publishResponse.data.id,
        status: 'uploaded'
      };
    } catch (error) {
      logger.error('Error uploading content to Instagram:', error);
      throw error;
    }
  }

  async getPostAnalytics(postId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/${postId}`, {
        params: {
          fields: 'id,caption,media_type,like_count,comments_count,timestamp,insights.metric(impressions,reach,engagement)',
          access_token: this.accessToken
        }
      });

      const post = response.data;
      return {
        postId,
        caption: post.caption,
        mediaType: post.media_type,
        likeCount: post.like_count,
        commentCount: post.comments_count,
        timestamp: post.timestamp,
        insights: post.insights?.data || []
      };
    } catch (error) {
      logger.error('Error fetching Instagram analytics:', error);
      throw error;
    }
  }

  async getStatus() {
    try {
      // Test API connection
      await axios.get(`${this.baseUrl}/me`, {
        params: {
          fields: 'id,username',
          access_token: this.accessToken
        }
      });

      return {
        platform: 'Instagram',
        status: 'connected',
        apiStatus: 'active',
        lastCheck: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Instagram status check failed:', error);
      return {
        platform: 'Instagram',
        status: 'error',
        apiStatus: 'error',
        lastCheck: new Date().toISOString(),
        error: error.message
      };
    }
  }
}