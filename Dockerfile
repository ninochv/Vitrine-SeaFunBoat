# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Variables Vite injectées au build via --build-arg (Dokploy env vars)
ARG VITE_JETBOOK_API_KEY
ARG VITE_JETBOOK_BASE_URL
ARG VITE_BOOKING_URL
ENV VITE_JETBOOK_API_KEY=$VITE_JETBOOK_API_KEY
ENV VITE_JETBOOK_BASE_URL=$VITE_JETBOOK_BASE_URL
ENV VITE_BOOKING_URL=$VITE_BOOKING_URL

RUN npm run build

# Stage 2 — Serve
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173"]
