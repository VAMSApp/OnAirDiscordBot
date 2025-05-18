# Use Node.js LTS as the base image
FROM node:18-slim

# Install curl and procps for healthcheck
RUN apt-get update && apt-get install -y curl procps && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set NODE_ENV
ENV NODE_ENV=production

# Add healthcheck - checks if node process is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD ps aux | grep node | grep -v grep || exit 1

# Command to run the application
CMD ["npm", "start"] 