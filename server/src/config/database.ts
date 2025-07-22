import { Sequelize } from 'sequelize-typescript';
import { logger } from '../utils/logger';
import Campaign from '../models/Campaign';
import Content from '../models/Content';
import AIProvider from '../models/AIProvider';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'ai_affiliate',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  models: [Campaign, Content, AIProvider],
  logging: (msg) => logger.info(msg),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully');
    
    // Sync models in development
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('Database models synchronized');
    }
  } catch (error) {
    logger.error('Database connection error:', error);
    throw error;
  }
};

sequelize.afterConnect(() => {
  logger.info('Database connection established');
});

sequelize.beforeDisconnect(() => {
  logger.warn('Database disconnecting');
});