# Stage 1: Build the frontend
FROM node:lts-slim AS builder

WORKDIR /app
COPY . .

# Install dependencies and build
RUN npm install && npm run build

# Stage 2: Use secure base to serve app
FROM nginx:stable-alpine

# Clean default NGINX
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]