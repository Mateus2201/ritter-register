# Etapa 1: build da aplicação
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final com Nginx
FROM nginx:alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a build do Next para o diretório padrão do Nginx
COPY --from=builder /app/out /usr/share/nginx/html

# Copia a nova configuração do Nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
