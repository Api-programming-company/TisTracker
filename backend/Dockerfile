# syntax=docker/dockerfile:1.4

# Usa la imagen base de PHP 7.4 con Apache
FROM php:7.4.22-apache as builder

# Instala dependencias y extensiones necesarias
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    git \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libicu-dev \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd intl zip pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*\
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Habilita el módulo rewrite de Apache
RUN a2enmod rewrite

# Configurar el directorio de trabajo
WORKDIR /var/www/html

# Copia el archivo de configuración de Apache si es necesario (ajusta la ruta si es necesario)
COPY apache.conf /etc/apache2/sites-available/000-default.conf

# Copiar los archivos del proyecto
COPY . .

# Instalar las dependencias de Composer
#RUN composer install --no-dev --optimize-autoloader --verbose

# Agrega el usuario y el grupo
#RUN useradd -s /bin/bash -m vscode \
#    && groupadd docker \
#    && usermod -aG docker vscode

# Asegúrate de que el usuario 'www-data' tenga acceso a los archivos de la aplicación
RUN chown -R www-data:www-data /var/www/html

# Exponemos el puerto 80
EXPOSE 80

# Ejecuta Apache en primer plano
CMD ["apache2-foreground"]
