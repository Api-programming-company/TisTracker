FROM php:8.2-apache

# Instala las dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Instala las extensiones de PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql zip

# Habilita el módulo de reescritura de Apache
RUN a2enmod rewrite

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia el archivo composer.json y composer.lock
COPY ./composer.json ./composer.lock /var/www/html/

# Copia todos los archivos de la aplicación
COPY . /var/www/html/

# Cambia al directorio de trabajo
WORKDIR /var/www/html

# Ejecuta composer install para instalar las dependencias
RUN composer install --no-dev --optimize-autoloader

# Configura Apache
COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

# Cambia los permisos
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

EXPOSE 80
