# Base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Use non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

# Expose port and run
EXPOSE 3000
CMD ["node", "dist/main"]
