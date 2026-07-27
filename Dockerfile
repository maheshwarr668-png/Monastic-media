# Stage 1: Build Vite React application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production static web server via Nginx
FROM nginx:alpine AS runner

# Copy built static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose standard HTTP port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
