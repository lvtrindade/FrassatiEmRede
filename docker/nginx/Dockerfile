# Build do Angular com Node.js
FROM node:18-bullseye as build
WORKDIR /app
COPY ./frontend .
RUN npm install
# Gera os arquivos em /dist
RUN npm run build

# Serve os arquivos com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/site /usr/share/nginx/html
COPY ./docker/nginx/nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80

