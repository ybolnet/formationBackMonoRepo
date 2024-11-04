# Use Node.js base image
FROM node:18-alpine AS base
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

# Target a specific application to run
FROM node:18-alpine AS runner

# Set the working directory for the runner stage
WORKDIR /app

# Copy the built files from the previous stage
COPY --from=base /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

# Expose port (assuming our app uses 3000; adjust if needed)
EXPOSE 3000

# Command to run the specific application within the monorepo
CMD ["node", "dist/apps/appWithDataBase/main.js"]
