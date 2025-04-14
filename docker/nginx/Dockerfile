# Build do Angular com Node.js
FROM node:18 as build
WORKDIR /app
COPY ./frontend .
RUN npm install
# Gera os arquivos em /dist
RUN npm run build

# Serve os arquivos com Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY ./nginx.config /etc/nginx/conf.d/default.conf
EXPOSE 80

