FROM oven/bun:1-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install Chromium and fonts for PDF generation
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont font-noto

ENV CHROMIUM_PATH=/usr/bin/chromium-browser
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN addgroup --system --gid 1001 sveltekit
RUN adduser --system --uid 1001 sveltekit

COPY --from=builder --chown=sveltekit:sveltekit /app/build ./build
COPY --from=builder --chown=sveltekit:sveltekit /app/package.json ./
COPY --from=builder --chown=sveltekit:sveltekit /app/bun.lock ./

# Install production dependencies (puppeteer-core needed at runtime)
RUN bun install --frozen-lockfile --production

USER sveltekit

EXPOSE 3000

ENV PORT=3000

CMD ["bun", "build/index.js"]
