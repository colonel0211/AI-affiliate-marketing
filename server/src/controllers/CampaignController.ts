import { Request, Response } from 'express';
import Campaign from '../models/Campaign';
import { logger } from '../utils/logger';
import { ApiResponse } from '../utils/apiResponse';

export class CampaignController {
  async getAllCampaigns(req: Request, res: Response) {
    try {
      const campaigns = await Campaign.find().sort({ createdAt: -1 });
      res.json(ApiResponse.success(campaigns));
    } catch (error) {
      logger.error('Error fetching campaigns:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch campaigns'));
    }
  }

  async getCampaign(req: Request, res: Response) {
    try {
      const campaign = await Campaign.findById(req.params.id);
      if (!campaign) {
        return res.status(404).json(ApiResponse.error('Campaign not found'));
      }
      res.json(ApiResponse.success(campaign));
    } catch (error) {
      logger.error('Error fetching campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to fetch campaign'));
    }
  }

  async createCampaign(req: Request, res: Response) {
    try {
      const campaign = new Campaign(req.body);
      await campaign.save();
      
      logger.info(`Campaign created: ${campaign.name}`);
      res.status(201).json(ApiResponse.success(campaign));
    } catch (error) {
      logger.error('Error creating campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to create campaign'));
    }
  }

  async updateCampaign(req: Request, res: Response) {
    try {
      const campaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      
      if (!campaign) {
        return res.status(404).json(ApiResponse.error('Campaign not found'));
      }
      
      res.json(ApiResponse.success(campaign));
    } catch (error) {
      logger.error('Error updating campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to update campaign'));
    }
  }

  async deleteCampaign(req: Request, res: Response) {
    try {
      const campaign = await Campaign.findByIdAndDelete(req.params.id);
      if (!campaign) {
        return res.status(404).json(ApiResponse.error('Campaign not found'));
      }
      
      res.json(ApiResponse.success({ message: 'Campaign deleted successfully' }));
    } catch (error) {
      logger.error('Error deleting campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to delete campaign'));
    }
  }

  async startCampaign(req: Request, res: Response) {
    try {
      const campaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        { status: 'active' },
        { new: true }
      );
      
      if (!campaign) {
        return res.status(404).json(ApiResponse.error('Campaign not found'));
      }
      
      logger.info(`Campaign started: ${campaign.name}`);
      res.json(ApiResponse.success(campaign));
    } catch (error) {
      logger.error('Error starting campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to start campaign'));
    }
  }

  async pauseCampaign(req: Request, res: Response) {
    try {
      const campaign = await Campaign.findByIdAndUpdate(
        req.params.id,
        { status: 'paused' },
        { new: true }
      );
      
      if (!campaign) {
        return res.status(404).json(ApiResponse.error('Campaign not found'));
      }
      
      logger.info(`Campaign paused: ${campaign.name}`);
      res.json(ApiResponse.success(campaign));
    } catch (error) {
      logger.error('Error pausing campaign:', error);
      res.status(500).json(ApiResponse.error('Failed to pause campaign'));
    }
  }
}