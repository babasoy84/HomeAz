FROM node:18-alpine AS build
WORKDIR /app

COPY src/Clients/vite-web/package.json src/Clients/vite-web/package-lock.json ./

COPY src/Clients/vite-web/tsconfig.json ./

RUN npm install

COPY src/Clients/vite-web/ ./

RUN npm run build

# Serve with Nginx
FROM nginx:alpine AS production
WORKDIR /var/www/web
COPY --from=build /app/dist .
COPY "src/Clients/vite-web/nginx.conf" /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]