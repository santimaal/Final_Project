# Segunda etapa: construye el backend
FROM python:3.9-alpine as backend

# Establece el directorio de trabajo para el backend
WORKDIR /app/backend

# Copia los archivos necesarios para el backend
COPY backend .

# Instala las dependencias
RUN pip install -r requirements.txt

# Tercera etapa: combina el frontend y el backend en un contenedor final
FROM python:3.9-alpine

# Establece el directorio de trabajo para el contenedor final
WORKDIR /app

# Copia los archivos necesarios del frontend desde la primera etapa
COPY --from=frontend /app/frontend/build /app/frontend/build

# Copia los archivos necesarios del backend desde la segunda etapa
COPY --from=backend /app/backend /app/backend

# Exponer los puertos 3000 y 3001
EXPOSE 3001

# Inicia la aplicación
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:3001"]
