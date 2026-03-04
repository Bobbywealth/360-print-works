FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js with memory limit
RUN NODE_OPTIONS='--max-old-space-size=512' bun run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Create db directory for SQLite
RUN mkdir -p /app/db

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Set database URL for SQLite
ENV DATABASE_URL="file:/app/db/custom.db"

# Use PORT from environment variable (Render sets this)
EXPOSE 10000

# Initialize database and start - use PORT env var
CMD sh -c "bunx prisma db push && bun server.js"
