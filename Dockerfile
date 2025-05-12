# Use Node.js 18 as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Install dependencies first (for better caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN pnpm build

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
