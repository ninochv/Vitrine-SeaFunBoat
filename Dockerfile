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

# Stage 2 — Serve avec nginx (pas de Node en prod)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
