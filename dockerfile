FROM node:22-alpine AS builder
WORKDIR app
ARG VITE_TINYMCE_API_URL
ARG VITE_API_URL
ARG VITE_PROFILE_APP_URL 
ENV VITE_TINYMCE_API_URL=$VITE_TINYMCE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_PROFILE_APP_URL=$VITE_PROFILE_APP_URL 
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:alpine AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
