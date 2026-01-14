# Lightweight nginx container to serve static files
FROM nginx:alpine

# Copy static files to nginx html directory
COPY . /usr/share/nginx/html/

# Remove unnecessary files from the container
RUN rm -f /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/.dockerignore \
    /usr/share/nginx/html/README.md

# Expose port 80
EXPOSE 80

# nginx runs in foreground by default in this image
CMD ["nginx", "-g", "daemon off;"]

