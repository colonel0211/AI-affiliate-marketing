import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-affiliate';
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Database connection error:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  logger.warn('Database disconnected');
});

mongoose.connection.on('error', (error) => {
  logger.error('Database error:', error);
});