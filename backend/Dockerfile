FROM php:7.4.22-fpm

# Instala dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libzip-dev \
    zip \
    git \
    curl \
    libpq-dev

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instala extensiones de PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install pdo pdo_pgsql

# Crear y configurar la aplicación
WORKDIR /var/www

COPY . .

RUN composer install

RUN chown -R www-data:www-data /var/www
RUN chmod -R 755 /var/www

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]