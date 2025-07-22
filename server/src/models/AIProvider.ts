import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

export interface IAIProvider {
  id?: number;
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
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  tableName: 'ai_providers',
  timestamps: true,
})
export default class AIProvider extends Model<IAIProvider> implements IAIProvider {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name!: string;

  @Column({
    type: DataType.ENUM('image', 'video', 'voice', 'text'),
    allowNull: false,
  })
  type!: 'image' | 'video' | 'voice' | 'text';

  @Column({
    type: DataType.ENUM('active', 'standby', 'quota_reached', 'error'),
    defaultValue: 'standby',
  })
  status!: 'active' | 'standby' | 'quota_reached' | 'error';

  @Column(DataType.STRING)
  apiKey?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  baseUrl!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  dailyLimit!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  usageToday!: number;

  @Column({
    type: DataType.DECIMAL(5, 2),
    defaultValue: 100,
  })
  successRate!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  avgResponseTime!: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'Free',
  })
  cost!: string;

  @Column({
    type: DataType.DECIMAL(3, 1),
    defaultValue: 8.0,
  })
  quality!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastUsed!: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  resetTime!: Date;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}