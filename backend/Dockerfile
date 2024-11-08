FROM php:8.2-apache

# Instala las dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Instala las extensiones de PHP
RUN docker-php-ext-install pdo pdo_pgsql pgsql zip

# Habilita el módulo de reescritura de Apache
RUN a2enmod rewrite

# Instala Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia todos los archivos de la aplicación
COPY . /var/www/html/

# Cambia al directorio de trabajo
WORKDIR /var/www/html

# Configura Apache
COPY ./apache.conf /etc/apache2/sites-available/000-default.conf

# Cambia los permisos
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html

# Instala dependencias de Composer para producción
RUN composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist

# Copia el archivo de configuración de Supervisor
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]