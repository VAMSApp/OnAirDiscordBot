# Use Node.js LTS as the base image
FROM node:18-slim

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

# Command to run the application
CMD ["npm", "start"] 