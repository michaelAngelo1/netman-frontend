# Dockerfile for React Vite TypeScript Project

# ---- Stage 1: Build ----
# Use an official Node.js LTS (Long Term Support) version as a parent image
# Alpine Linux is used for its small size
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
COPY package*.json ./

# Install project dependencies
# If you use yarn, replace 'npm install' with 'yarn install'
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the project for production
# Vite typically uses 'npm run build'
RUN npm run build

# ---- Stage 2: Serve ----
# Use a lightweight Nginx image to serve the static files
FROM nginx:stable-alpine AS production

# Set the working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy the built static files from the 'build' stage to Nginx's web root directory
# Vite's default output directory is 'dist'
COPY --from=build /app/dist .

# Copy a custom Nginx configuration file (optional, but recommended for SPAs)
# Create an nginx.conf file in your project root if you need custom configurations
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# If you don't have a custom nginx.conf, Nginx will use its default.
# For Vite/React Router, you might need a configuration like this to handle client-side routing:
#
# server {
#   listen 80;
#   server_name localhost;
#
#   root /usr/share/nginx/html;
#   index index.html index.htm;
#
#   location / {
#     try_files $uri $uri/ /index.html;
#   }
#
#   # Optional: Add headers to prevent caching issues
#   location ~* \.(?:manifest|appcache|html?|xml|json)$ {
#     expires -1;
#   }
#
#   location ~* \.(?:css|js)$ {
#     try_files $uri =404;
#     expires 1y;
#     access_log off;
#     add_header Cache-Control "public";
#   }
#
#   # Optional: Serve gzipped static assets if available
#   gzip on;
#   gzip_vary on;
#   gzip_proxied any;
#   gzip_comp_level 6;
#   gzip_buffers 16 8k;
#   gzip_http_version 1.1;
#   gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
# }

# Expose port 80 (Nginx default port)
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
