# Imagem base
FROM php:8.3-apache

# Instala dependências
RUN apt-get update && apt-get install -y \
    git unzip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Extensões PHP
RUN docker-php-ext-install pdo pdo_mysql \
    && pecl install apcu && docker-php-ext-enable apcu

# Configura Apache
RUN a2enmod rewrite headers

# Instalação do projeto
WORKDIR /var/www/html
COPY ./backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Copia o código (preserva permissões)
COPY --chown=www-data:www-data ./backend .

# Configurações finais
EXPOSE 80
CMD ["apache2-foreground"]