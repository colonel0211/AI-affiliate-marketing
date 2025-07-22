import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';
import { initializeJobs } from './services/jobScheduler';
import routes from './routes';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Socket.IO for real-time updates
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Make io available globally
app.set('io', io);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-affiliate');
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Initialize jobs
const initializeSystem = async () => {
  await connectDB();
  await initializeJobs();
  logger.info('AI Affiliate Marketing System initialized');
};

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await initializeSystem();
});

export { io };