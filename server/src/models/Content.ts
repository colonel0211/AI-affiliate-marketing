import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  title: string;
  description: string;
  platform: 'youtube' | 'instagram' | 'tiktok';
  status: 'processing' | 'ready' | 'published' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  affiliateLinks: string[];
  views: number;
  engagement: number;
  revenue: number;
  campaignId: mongoose.Types.ObjectId;
  aiProviders: {
    image: string;
    video: string;
    voice: string;
    text: string;
  };
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  platform: { type: String, enum: ['youtube', 'instagram', 'tiktok'], required: true },
  status: { type: String, enum: ['processing', 'ready', 'published', 'failed'], default: 'processing' },
  videoUrl: { type: String },
  thumbnailUrl: { type: String },
  tags: [{ type: String }],
  affiliateLinks: [{ type: String }],
  views: { type: Number, default: 0 },
  engagement: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  campaignId: { type: Schema.Types.ObjectId, ref: 'Campaign', required: true },
  aiProviders: {
    image: { type: String, required: true },
    video: { type: String, required: true },
    voice: { type: String, required: true },
    text: { type: String, required: true }
  },
  publishedAt: { type: Date }
}, {
  timestamps: true
});

export default mongoose.model<IContent>('Content', ContentSchema);