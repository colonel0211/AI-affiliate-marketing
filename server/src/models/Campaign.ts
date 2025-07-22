import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import Content from './Content';

export interface ICampaign {
  id?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'campaigns',
  timestamps: true,
})
export default class Campaign extends Model<ICampaign> implements ICampaign {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
    },
  })
  name!: string;

  @Column({
    type: DataType.ENUM('youtube', 'instagram', 'tiktok'),
    allowNull: false,
  })
  platform!: 'youtube' | 'instagram' | 'tiktok';

  @Column({
    type: DataType.ENUM('active', 'paused', 'completed'),
    defaultValue: 'active',
  })
  status!: 'active' | 'paused' | 'completed';

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  frequency!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  nextPost!: Date;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  videosQueued!: number;

  @Column({
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  totalViews!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
  })
  revenue!: number;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  affiliateLinks!: string[];

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    defaultValue: [],
  })
  targetKeywords!: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  contentTemplate!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => Content)
  content!: Content[];
}