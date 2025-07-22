# Stage 1 - Build
FROM node:18 AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Stage 2 - Serve
FROM node:18-alpine

WORKDIR /app

# Install serve to serve static files
RUN npm install -g serve

# Copy only the final build output
COPY --from=builder /app/dist .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
