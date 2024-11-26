# Use Node.js base image
FROM node:22.11-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# Set the working directory
WORKDIR /app

# Install dependencies in a separate layer for caching
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
#RUN pnpm setup
RUN pnpm add -g nx

# Copy the monorepo files
COPY . .

# Build the monorepo (this builds all apps and libs in the monorepo)
RUN nx build appWithDataBase

# Expose port (assuming our app uses 3000; adjust if needed)
EXPOSE 3000

# Command to run the specific application within the monorepo
CMD ["node", "dist/apps/appWithDataBase/main.js"]
