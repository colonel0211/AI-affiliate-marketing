import mongoose, { Document, Schema } from 'mongoose';

export interface ICampaign extends Document {
  name: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  status: 'active' | 'paused' | 'completed';
  frequency: string;
  nextPost: Date;
  videosQueued: number;
  totalViews: number;
  revenue: number;
  affiliateLinks: string[];
  targetKeywords: string[];
  contentTemplate: string;
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>({
  name: { type: String, required: true },
  platform: { type: String, enum: ['youtube', 'instagram', 'tiktok'], required: true },
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' },
  frequency: { type: String, required: true },
  nextPost: { type: Date, required: true },
  videosQueued: { type: Number, default: 0 },
  totalViews: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  affiliateLinks: [{ type: String }],
  targetKeywords: [{ type: String }],
  contentTemplate: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);