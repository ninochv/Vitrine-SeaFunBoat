# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ARG VITE_BOOKING_URL=https://seafunboat.seabook.pro
ENV VITE_JETBOOK_BASE_URL=$VITE_JETBOOK_BASE_URL
ENV VITE_BOOKING_URL=$VITE_BOOKING_URL

RUN npm run build

# Stage 2 — Serve avec nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Le dossier /etc/nginx/templates/ est traité automatiquement par l'entrypoint nginx
# via envsubst — plus fiable que la substitution manuelle dans CMD
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Script de démarrage : attend que l'API soit prête avant de lancer nginx
COPY wait-for-api.sh /docker-entrypoint.d/05-wait-for-api.sh
RUN chmod +x /docker-entrypoint.d/05-wait-for-api.sh

# Variables runtime — à configurer dans Dokploy > Environment Variables
ENV VITE_JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ENV VITE_JETBOOK_API_KEY=

EXPOSE 80
