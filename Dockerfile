# Stage 1: Builder - Install everything and build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (dev + prod)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production - Clean and optimized
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --only=production && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy source files (for migrations etc.)
COPY --from=builder /app/src ./src

# Copy credentials file if it exists
COPY --from=builder /app/credentials.json ./credentials.json

# Start the application
CMD ["npm", "run", "start"]