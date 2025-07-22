import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Campaign from './Campaign';

export interface IContent {
  id?: number;
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
  campaignId: number;
  aiProviders: {
    image: string;
    video: string;
    voice: string;
    text: string;
  };
  publishedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'content',
  timestamps: true,
})
export default class Content extends Model<IContent> implements IContent {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.ENUM('youtube', 'instagram', 'tiktok'),
    allowNull: false,
  })
  platform!: 'youtube' | 'instagram' | 'tiktok';

  @Column({
    type: DataType.ENUM('processing', 'ready', 'published', 'failed'),
    defaultValue: 'processing',
  })
  status!: 'processing' | 'ready' | 'published' | 'failed';

  @Column(DataType.STRING)
  videoUrl?: string;

  @Column(DataType.STRING)
  thumbnailUrl?: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  tags!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  affiliateLinks!: string[];

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  views!: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    defaultValue: 0,
  })
  engagement!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
  })
  revenue!: number;

  @ForeignKey(() => Campaign)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  campaignId!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  aiProviders!: {
    image: string;
    video: string;
    voice: string;
    text: string;
  };

  @Column(DataType.DATE)
  publishedAt?: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @BelongsTo(() => Campaign)
  campaign!: Campaign;
}