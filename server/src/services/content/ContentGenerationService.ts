import { AIProviderManager } from '../ai/AIProviderManager';
import { YouTubeService } from '../social/YouTubeService';
import { InstagramService } from '../social/InstagramService';
import { TikTokService } from '../social/TikTokService';
import Content from '../../models/Content';
import Campaign from '../../models/Campaign';
import { logger } from '../../utils/logger';

export class ContentGenerationService {
  private aiProviderManager = new AIProviderManager();
  private youtubeService = new YouTubeService();
  private instagramService = new InstagramService();
  private tiktokService = new TikTokService();

  async scrapeContent() {
    try {
      logger.info('Starting content scraping...');

      // Scrape from all platforms
      const [youtubeTrending, instagramTrending, tiktokTrending] = await Promise.all([
        this.youtubeService.getTrendingVideos(),
        this.instagramService.getTrendingContent(),
        this.tiktokService.getTrendingVideos()
      ]);

      // Process and store trending content for analysis
      const allTrending = [
        ...youtubeTrending.map(v => ({ ...v, platform: 'youtube' })),
        ...instagramTrending.map(v => ({ ...v, platform: 'instagram' })),
        ...tiktokTrending.map(v => ({ ...v, platform: 'tiktok' }))
      ];

      logger.info(`Scraped ${allTrending.length} trending content pieces`);
      return allTrending;
    } catch (error) {
      logger.error('Error scraping content:', error);
      throw error;
    }
  }

  async generateContent() {
    try {
      logger.info('Starting content generation...');

      // Get active campaigns
      const activeCampaigns = await Campaign.find({ status: 'active' });

      for (const campaign of activeCampaigns) {
        if (campaign.videosQueued < 10) { // Generate more content if queue is low
          await this.generateContentForCampaign(campaign);
        }
      }

      logger.info('Content generation completed');
    } catch (error) {
      logger.error('Error generating content:', error);
      throw error;
    }
  }

  private async generateContentForCampaign(campaign: any) {
    try {
      // Get AI providers
      const [textProvider, imageProvider, videoProvider, voiceProvider] = await Promise.all([
        this.aiProviderManager.getAvailableProvider('text'),
        this.aiProviderManager.getAvailableProvider('image'),
        this.aiProviderManager.getAvailableProvider('video'),
        this.aiProviderManager.getAvailableProvider('voice')
      ]);

      // Generate content using AI providers
      const contentData = await this.createContentWithAI({
        campaign,
        textProvider,
        imageProvider,
        videoProvider,
        voiceProvider
      });

      // Save content to database
      const content = new Content({
        title: contentData.title,
        description: contentData.description,
        platform: campaign.platform,
        status: 'ready',
        tags: contentData.tags,
        affiliateLinks: campaign.affiliateLinks,
        campaignId: campaign._id,
        aiProviders: {
          text: textProvider.name,
          image: imageProvider.name,
          video: videoProvider.name,
          voice: voiceProvider.name
        }
      });

      await content.save();

      // Update campaign queue count
      campaign.videosQueued += 1;
      await campaign.save();

      logger.info(`Generated content for campaign: ${campaign.name}`);
    } catch (error) {
      logger.error(`Error generating content for campaign ${campaign.name}:`, error);
    }
  }

  private async createContentWithAI(params: any) {
    const { campaign, textProvider, imageProvider, videoProvider, voiceProvider } = params;

    // Mock AI content generation - replace with actual AI API calls
    const mockContent = {
      title: `${campaign.name} - AI Generated Content ${Date.now()}`,
      description: `Automated content generated for ${campaign.platform} using AI providers`,
      tags: campaign.targetKeywords || ['ai', 'automation', 'affiliate'],
      videoUrl: 'https://example.com/generated-video.mp4',
      thumbnailUrl: 'https://example.com/generated-thumbnail.jpg'
    };

    // Update provider usage
    await Promise.all([
      this.aiProviderManager.updateProviderUsage(textProvider._id, true, 2000),
      this.aiProviderManager.updateProviderUsage(imageProvider._id, true, 5000),
      this.aiProviderManager.updateProviderUsage(videoProvider._id, true, 30000),
      this.aiProviderManager.updateProviderUsage(voiceProvider._id, true, 8000)
    ]);

    return mockContent;
  }

  async publishContent() {
    try {
      logger.info('Starting content publishing...');

      // Get ready content
      const readyContent = await Content.find({ status: 'ready' })
        .populate('campaignId')
        .limit(10);

      for (const content of readyContent) {
        await this.publishToSocialMedia(content);
      }

      logger.info('Content publishing completed');
    } catch (error) {
      logger.error('Error publishing content:', error);
      throw error;
    }
  }

  private async publishToSocialMedia(content: any) {
    try {
      let result;

      switch (content.platform) {
        case 'youtube':
          result = await this.youtubeService.uploadVideo({
            title: content.title,
            description: content.description,
            videoPath: content.videoUrl,
            tags: content.tags
          });
          break;

        case 'instagram':
          result = await this.instagramService.uploadContent({
            caption: content.description,
            mediaPath: content.videoUrl,
            mediaType: 'VIDEO'
          });
          break;

        case 'tiktok':
          result = await this.tiktokService.uploadVideo({
            caption: content.description,
            videoPath: content.videoUrl,
            hashtags: content.tags
          });
          break;

        default:
          throw new Error(`Unsupported platform: ${content.platform}`);
      }

      // Update content status
      content.status = 'published';
      content.publishedAt = new Date();
      await content.save();

      // Update campaign metrics
      const campaign = content.campaignId;
      campaign.videosQueued -= 1;
      await campaign.save();

      logger.info(`Published content to ${content.platform}: ${content.title}`);
    } catch (error) {
      logger.error(`Error publishing content ${content._id}:`, error);
      content.status = 'failed';
      await content.save();
    }
  }
}