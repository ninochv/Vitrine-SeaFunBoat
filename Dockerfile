# Stage 1 — Build
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Seule variable Vite nécessaire au build (injectée dans le bundle JS)
ARG VITE_JETBOOK_API_KEY
ARG VITE_JETBOOK_BASE_URL=https://trial2.seabook.pro
ARG VITE_BOOKING_URL
ENV VITE_JETBOOK_API_KEY=$VITE_JETBOOK_API_KEY
ENV VITE_JETBOOK_BASE_URL=$VITE_JETBOOK_BASE_URL
ENV VITE_BOOKING_URL=$VITE_BOOKING_URL

RUN npm run build

# Stage 2 — Serve avec nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /tmp/nginx.conf.template

# URL JetBook pour le proxy nginx — configurable via env var Dokploy (runtime, pas build-time)
ENV JETBOOK_BASE_URL=https://trial2.seabook.pro

# envsubst substitue uniquement ${JETBOOK_BASE_URL}, les vars nginx ($uri, $http_host…) sont préservées
CMD ["/bin/sh", "-c", "envsubst '${JETBOOK_BASE_URL}' < /tmp/nginx.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
EXPOSE 80
