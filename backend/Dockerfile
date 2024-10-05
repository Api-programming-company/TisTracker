FROM php:8.2-apache

RUN apt-get update && apt-get install -y libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql pgsql

RUN a2enmod rewrite

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia el archivo composer.json y composer.lock
COPY ./composer.json ./composer.lock /var/www/html/

# Ejecuta composer install para instalar las dependencias
RUN composer install --no-dev --optimize-autoloader


COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

COPY ./ /var/www/html/

RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

EXPOSE 80

# CMD ["apache2-foreground"]