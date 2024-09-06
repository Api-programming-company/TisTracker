# Usar una imagen de Node.js más liviana
FROM node:18

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Exponer el puerto de desarrollo de React
EXPOSE 3000

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "start"]
