# Stage 1: Build
FROM node:18 AS builder

WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the production app
RUN npm run build

# Stage 2: Serve
FROM node:18-alpine

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built assets from builder stage
COPY --from=builder /app/dist ./dist

# Expose port 8000
EXPOSE 8000

# Start serve
CMD ["serve", "-s", "dist", "-l", "8000"]
