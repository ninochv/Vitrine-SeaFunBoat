# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# VITE_JETBOOK_BASE_URL sert uniquement au fallback du lien "Réserver" dans le bundle
ARG VITE_JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ARG VITE_BOOKING_URL=https://seafunboat.seabook.pro
ENV VITE_JETBOOK_BASE_URL=$VITE_JETBOOK_BASE_URL
ENV VITE_BOOKING_URL=$VITE_BOOKING_URL

RUN npm run build

# Stage 2 — Serve avec nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /tmp/nginx.conf.template

# Variables runtime — à configurer dans Dokploy "Environment Variables" (pas Build Args)
ENV JETBOOK_BASE_URL=https://seafunboat.seabook.pro
ENV JETBOOK_API_KEY=

# envsubst substitue uniquement les deux placeholders, les vars nginx ($uri etc.) sont préservées
CMD ["/bin/sh", "-c", "envsubst '${JETBOOK_BASE_URL}${JETBOOK_API_KEY}' < /tmp/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
EXPOSE 80
