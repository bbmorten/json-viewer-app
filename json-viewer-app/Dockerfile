# Stage 1: Build the Angular application
FROM node:latest as build
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=prod

# Stage 2: Serve the Angular application from Nginx
FROM nginx:latest
COPY  --from=build /app/dist/json-viewer-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the .env file
COPY ./.env /usr/share/nginx/html/.env

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
