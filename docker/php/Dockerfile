# Estágio de construção
FROM php:8.3-fpm-alpine as builder

# 1. Instala dependências
RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zlib-dev \
    $PHPIZE_DEPS

# 2. Instala extensões PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_mysql \
    zip \
    gd \
    opcache && \
    pecl install apcu && \
    docker-php-ext-enable apcu

# 3. Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Diretório de trabalho
WORKDIR /var/www/html

# 5. Copia arquivos do composer
COPY backend/composer.json backend/composer.lock ./

# 6. Instala dependências
RUN composer install --no-dev --no-interaction --optimize-autoloader --prefer-dist

# Estágio de produção
FROM php:8.3-fpm-alpine

# 7. Instala dependências de runtime
RUN apk add --no-cache \
    libzip \
    libpng \
    libjpeg-turbo \
    freetype \
    zlib \
    mysql-client

# 8. Instala extensões PHP
RUN apk add --no-cache --virtual .build-deps \
    zlib-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    autoconf \
    g++ \
    make \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_mysql \
        opcache \
        zip \
        gd \
    && pecl install apcu \
    && docker-php-ext-enable apcu \
    && apk del .build-deps

# 9. Copia arquivos de configuração
COPY docker/php/php.ini /usr/local/etc/php/php.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/zzz-custom.conf

# 10. Cria e configura o entrypoint
RUN echo "#!/bin/sh" > /usr/local/bin/docker-php-entrypoint-custom && \
    echo "exec docker-php-entrypoint \"\$@\"" >> /usr/local/bin/docker-php-entrypoint-custom && \
    chmod +x /usr/local/bin/docker-php-entrypoint-custom

COPY docker/php/healthcheck.php /var/www/html/healthcheck.php

# 11. Copia o vendor e composer do builder
COPY --from=builder /usr/bin/composer /usr/bin/composer
COPY --from=builder /var/www/html/vendor /var/www/html/vendor

# 12. Copia o código fonte
COPY backend /var/www/html

# 13. Permissões
RUN chown -R www-data:www-data /var/www/html && \
    find /var/www/html -type d -exec chmod 755 {} \; && \
    find /var/www/html -type f -exec chmod 644 {} \;

WORKDIR /var/www/html

ENTRYPOINT ["docker-php-entrypoint-custom"]
CMD ["php-fpm"]

EXPOSE 9000

#HEALTHCHECK --interval=30s --timeout=3s --start-period=1m \
#  CMD curl -f http://localhost:9000/healthcheck.php || exit 1