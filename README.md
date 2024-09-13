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
   ```

2. **Migrar la Base de Datos**

   ```sh
   php artisan migrate
   ```

3. **Iniciar el Servidor de Desarrollo**

   Finalmente, inicia el servidor de desarrollo de Laravel con el siguiente comando:

   ```sh
   php artisan serve
   ```

   Por defecto, el servidor estará disponible en http://localhost:8000.

4. **Crear una Migración**

   Usa el siguiente comando para crear una nueva migración:

   ```sh
   php artisan make:migration nombre_de_la_migracion
   ```

5. **Crear un Modelo**

   Usa el siguiente comando para crear un nuevo modelo:

   ```sh
   php artisan make:model NombreDelModelo
   ```

6. **Crear un Controlador**

   Usa el siguiente comando para crear un nuevo controlador:

   ```sh
   php artisan make:controller NombreDelControlador
   ```

# Guía de Instalación para el Frontend

1. **Instalar Node.js**

   Descarga e instala Node.js 20 LTS desde el sitio oficial:

   [Descargar Node.js](https://nodejs.org/dist/v20.17.0/node-v20.17.0-x64.msi)

2. **Instalar Dependencias del Proyecto**

   Navega a la carpeta `frontend` del repositorio y

   ```sh
   cd frontend
   npm install
   ```

3. **Iniciar el Servidor de Desarrollo**

   Inicia el servidor de desarrollo de React con el siguiente comando:

   ```sh
   npm start
   ```

   Por defecto, el servidor estará disponible en http://localhost:3000.

# Scripts de Instalación y Ejecución

Para facilitar la instalación y el inicio de los servicios:

- **instalarBackend.bat:** Actualiza las dependencias del backend.
- **instalarFrontend.bat:** Actualiza las dependencias del frontend.
- **iniciarBackend.bat:** Inicia el servidor de desarrollo del backend.
- **iniciarFrontend.bat:** Inicia el servidor de desarrollo del frontend.

Ejecutar estos archivos .bat desde el explorador de archivos de Windows o la línea de comandos.

# Licencia
![cat](https://media1.tenor.com/m/DM7SdBiQKhEAAAAd/cat-underwater.gif)
