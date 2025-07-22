import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const campaignSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  platform: Joi.string().valid('youtube', 'instagram', 'tiktok').required(),
  frequency: Joi.string().required(),
  affiliateLinks: Joi.array().items(Joi.string().uri()),
  targetKeywords: Joi.array().items(Joi.string()),
  contentTemplate: Joi.string().required()
});

export const validateCampaign = (req: Request, res: Response, next: NextFunction) => {
  const { error } = campaignSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      details: error.details.map(detail => detail.message)
    });
  }
  
  next();
};