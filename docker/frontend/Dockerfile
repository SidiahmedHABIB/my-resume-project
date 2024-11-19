# Build Stage
FROM node:18.13 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/my-resume-app/browser /usr/share/nginx/html
