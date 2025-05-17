FROM node:18-bullseye as build
WORKDIR /app

# Cache de dependências
COPY ./frontend/package*.json ./
RUN npm install --prefer-offline --no-audit

# Copia o código
COPY ./frontend .

# Build de produção
RUN npm run build --configuration=production

FROM nginx:alpine

# Copia os arquivos buildados
COPY --from=build /app/dist/site /usr/share/nginx/html

# Copia a configuração do Nginx (caminho corrigido)
COPY ./docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Permissões
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80