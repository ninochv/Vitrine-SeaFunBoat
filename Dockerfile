# Stage 1 — Build Vue
FROM node:20-alpine AS vue-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ARG VITE_BOOKING_URL=https://seafunboat.seabook.pro
ENV VITE_JETBOOK_BASE_URL=$VITE_JETBOOK_BASE_URL
ENV VITE_BOOKING_URL=$VITE_BOOKING_URL
RUN npm run build

# Stage 2 — Prépare les dépendances de l'API
FROM node:20-alpine AS api-builder
WORKDIR /api
COPY api/package*.json ./
RUN npm ci --omit=dev

# Stage 3 — Image finale : nginx + Node.js (même conteneur)
FROM nginx:alpine

# Installe Node.js pour lancer l'API Express
RUN apk add --no-cache nodejs

# Application Vue
COPY --from=vue-builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# API Express
WORKDIR /api
COPY --from=api-builder /api/node_modules ./node_modules
COPY api/server.js .

# Script de démarrage : lance l'API avant nginx
COPY start-api.sh /docker-entrypoint.d/05-start-api.sh
RUN chmod +x /docker-entrypoint.d/05-start-api.sh

ENV VITE_JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ENV VITE_JETBOOK_API_KEY=
ENV ADMIN_PASS=sfb2025

EXPOSE 80
