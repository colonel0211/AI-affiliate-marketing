import mongoose, { Document, Schema } from 'mongoose';

export interface IAIProvider extends Document {
  name: string;
  type: 'image' | 'video' | 'voice' | 'text';
  status: 'active' | 'standby' | 'quota_reached' | 'error';
  apiKey?: string;
  baseUrl: string;
  dailyLimit: number;
  usageToday: number;
  successRate: number;
  avgResponseTime: number;
  cost: string;
  quality: number;
  lastUsed: Date;
  resetTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AIProviderSchema = new Schema<IAIProvider>({
  name: { type: String, required: true, unique: true },
  type: { type: String, enum: ['image', 'video', 'voice', 'text'], required: true },
  status: { type: String, enum: ['active', 'standby', 'quota_reached', 'error'], default: 'standby' },
  apiKey: { type: String },
  baseUrl: { type: String, required: true },
  dailyLimit: { type: Number, required: true },
  usageToday: { type: Number, default: 0 },
  successRate: { type: Number, default: 100 },
  avgResponseTime: { type: Number, default: 0 },
  cost: { type: String, default: 'Free' },
  quality: { type: Number, default: 8.0 },
  lastUsed: { type: Date, default: Date.now },
  resetTime: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model<IAIProvider>('AIProvider', AIProviderSchema);