# Guía de Instalación para el Backend
## Instalación de PHP
1. **Descargar PHP**

   Descarga el archivo PHP preconfigurado desde el siguiente enlace:
   
   [Descargar PHP](https://drive.google.com/file/d/1rmSrcTG7ycIGDwLA8z7AmTQO6LvWWpqF/view?usp=sharing)

2. **Descomprimir el Archivo**

   Extrae el contenido del archivo `php.zip` a una carpeta de tu elección. Este archivo contiene una configuración de `php.ini` ya lista para usar.

3. **Configurar el PATH de PHP**

   Agrega la carpeta donde descomprimiste PHP al PATH del sistema para que puedas ejecutar PHP desde la línea de comandos. Puedes hacerlo de la siguiente manera:
   
   - **Windows**:
     1. Abre el Panel de Control y busca "Variables de entorno".
     2. En "Variables del sistema", busca la variable `Path` y haz clic en "Editar".
     3. Agrega la ruta a la carpeta de PHP al final de la lista, separada por un punto y coma (`;`).
     4. Guarda los cambios y cierra las ventanas.

## Instalación de Composer

1. **Descargar Composer**

   Descarga el instalador de Composer para tu sistema operativo desde el sitio web oficial:
   
   [Composer](https://getcomposer.org/Composer-Setup.exe)

2. **Instalar Composer**

   - **Windows**:
     1. Ejecuta el archivo de instalación descargado y sigue las instrucciones del asistente de instalación.
     2. Asegúrate de que la opción para agregar Composer al PATH esté seleccionada durante la instalación.

## Comandos Básicos para Usar Laravel

1. **Instalar Dependencias**

   Navega a la carpeta `backend` del repositorio y ejecuta el siguiente comando para instalar las dependencias de Laravel:
   ```sh
   cd backend
   composer install
2. **Migrar la Base de Datos**
    ```sh
    php artisan migrate
3. **Iniciar el Servidor de Desarrollo**
    Finalmente, inicia el servidor de desarrollo de Laravel con el siguiente comando:
    ```sh
    php artisan serve
Por defecto, el servidor estará disponible en http://localhost:8000.
# Comandos
## Construye los contenedores de Docker
docker-compose build
## Inicia los contenedores en segundo plano
docker-compose up -d
## Ejecutar la primera vez para instalar dependencias del backend
docker-compose exec app composer install
## Para detener los contenedores
docker-compose down
# Licencia
Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.

![cat](https://media1.tenor.com/m/DM7SdBiQKhEAAAAd/cat-underwater.gif)