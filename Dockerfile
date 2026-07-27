# Stage 1: Build Vite React SPA Application
FROM node:22-alpine AS builder

WORKDIR /app

# Ensure maximum V8 heap availability during build
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package manifests first for optimal Docker caching
COPY package.json package-lock.json ./

# Clean continuous integration dependency install
RUN npm ci

# Copy full source codebase
COPY . .

# Build production bundled assets into /app/dist
RUN npm run build

# Stage 2: Ultra-lightweight Nginx Production Server
FROM nginx:alpine AS runner

# Set production environment variables
ENV PORT=3000
ENV HOST=0.0.0.0
ENV NODE_ENV=production

# Copy built frontend assets from Stage 1 builder to Nginx web root
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx SPA reverse-proxy compatible configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose both ports 80 and 3000 to guarantee Coolify / Traefik ingress compatibility
EXPOSE 80 3000

# Container healthcheck for orchestrator readiness verification
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:80/healthz || curl -f http://localhost:3000/healthz || exit 1

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
