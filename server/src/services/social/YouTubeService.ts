import { google } from 'googleapis';
import axios from 'axios';
import { logger } from '../../utils/logger';

export class YouTubeService {
  private youtube: any;
  private auth: any;

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth() {
    try {
      this.auth = new google.auth.OAuth2(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
      );

      if (process.env.YOUTUBE_ACCESS_TOKEN) {
        this.auth.setCredentials({
          access_token: process.env.YOUTUBE_ACCESS_TOKEN,
          refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
        });
      }

      this.youtube = google.youtube({ version: 'v3', auth: this.auth });
    } catch (error) {
      logger.error('YouTube auth initialization failed:', error);
    }
  }

  async getTrendingVideos() {
    try {
      // Using YouTube Data API to get trending videos
      const response = await this.youtube.videos.list({
        part: ['snippet', 'statistics'],
        chart: 'mostPopular',
        regionCode: 'US',
        maxResults: 50,
        videoCategoryId: '22' // People & Blogs category
      });

      const trendingVideos = response.data.items
        .filter((video: any) => parseInt(video.statistics.viewCount) >= 500000)
        .map((video: any) => ({
          id: video.id,
          title: video.snippet.title,
          description: video.snippet.description,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
          thumbnails: video.snippet.thumbnails,
          viewCount: parseInt(video.statistics.viewCount),
          likeCount: parseInt(video.statistics.likeCount || 0),
          commentCount: parseInt(video.statistics.commentCount || 0),
          tags: video.snippet.tags || [],
          categoryId: video.snippet.categoryId
        }));

      logger.info(`Found ${trendingVideos.length} trending YouTube videos`);
      return trendingVideos;
    } catch (error) {
      logger.error('Error fetching YouTube trending videos:', error);
      throw error;
    }
  }

  async uploadVideo(videoData: {
    title: string;
    description: string;
    videoPath: string;
    tags: string[];
  }) {
    try {
      const { title, description, videoPath, tags } = videoData;

      const response = await this.youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description,
            tags,
            categoryId: '22', // People & Blogs
            defaultLanguage: 'en'
          },
          status: {
            privacyStatus: 'public',
            selfDeclaredMadeForKids: false
          }
        },
        media: {
          body: require('fs').createReadStream(videoPath)
        }
      });

      logger.info(`Video uploaded to YouTube: ${response.data.id}`);
      return {
        videoId: response.data.id,
        url: `https://www.youtube.com/watch?v=${response.data.id}`,
        status: 'uploaded'
      };
    } catch (error) {
      logger.error('Error uploading video to YouTube:', error);
      throw error;
    }
  }

  async getVideoAnalytics(videoId: string) {
    try {
      const response = await this.youtube.videos.list({
        part: ['statistics', 'snippet'],
        id: [videoId]
      });

      if (response.data.items.length === 0) {
        throw new Error('Video not found');
      }

      const video = response.data.items[0];
      return {
        videoId,
        title: video.snippet.title,
        viewCount: parseInt(video.statistics.viewCount || 0),
        likeCount: parseInt(video.statistics.likeCount || 0),
        dislikeCount: parseInt(video.statistics.dislikeCount || 0),
        commentCount: parseInt(video.statistics.commentCount || 0),
        publishedAt: video.snippet.publishedAt
      };
    } catch (error) {
      logger.error('Error fetching YouTube analytics:', error);
      throw error;
    }
  }

  async getStatus() {
    try {
      // Test API connection
      await this.youtube.channels.list({
        part: ['snippet'],
        mine: true
      });

      return {
        platform: 'YouTube',
        status: 'connected',
        apiStatus: 'active',
        lastCheck: new Date().toISOString()
      };
    } catch (error) {
      logger.error('YouTube status check failed:', error);
      return {
        platform: 'YouTube',
        status: 'error',
        apiStatus: 'error',
        lastCheck: new Date().toISOString(),
        error: error.message
      };
    }
  }
}