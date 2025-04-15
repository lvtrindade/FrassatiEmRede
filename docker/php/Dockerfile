# Usa a imagem oficial do PHP 8.3 com Apache
FROM php:8.3-apache

# Instala dependencias do sistema + Composer
RUN apt-get update && apt-get install -y \
    git unzip \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instala as extensões necessárias (pdo_mysql)
RUN docker-php-ext-install pdo pdo_mysql

# Habilita o mod_rewrite do Apache (para rotas no Slim)
RUN a2enmod rewrite

# Intala do Compose
WORKDIR /var/www/html
COPY ./backend/composer.* ./
RUN composer install --no-dev --optimize-autoloader
COPY ./backend .

# Copia o código PHP para o container
COPY ./backend/.htaccess /var/www/html/.htaccess

# Garante permissões corretas
RUN chown -R www-data:www-data /var/www/html

# Expõe a porta 80 (Apache)
EXPOSE 80