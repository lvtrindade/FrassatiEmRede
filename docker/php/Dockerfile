# Usa a imagem oficial do PHP 8.3 com Apache
FROM php:8.3-apache

# Instala as extensões necessárias (pdo_mysql)
RUN docker-php-ext-install pdo pdo_mysql

# Habilita o mod_rewrite do Apache (para rotas no Slim)
RUN a2enmod rewrite

# Copia o código PHP para o container
COPY ./backend /var/www/html/

# Expõe a porta 80 (Apache)
EXPOSE 80