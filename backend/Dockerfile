# Use official Node.js LTS Alpine image (small footprint)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for layer caching
COPY package.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy source code (excludes files in .dockerignore)
COPY . .

# Cloud Run injects PORT automatically (usually 8080)
# Our server.js already reads process.env.PORT

# Expose the port (documentation only — Cloud Run reads PORT env var)
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
