# syntax=docker/dockerfile:1

# Use a newer Node.js version
ARG NODE_VERSION=20.5.0
FROM node:${NODE_VERSION}-alpine

# Use production node environment by default
ENV NODE_ENV production

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install -g nodemon
RUN npm ci --omit=dev


RUN mkdir -p /usr/src/app-service/middleware && \
    chmod -R 755 /usr/src/app-service
    
# Copy the rest of the application code
COPY . .

# Run as a non-root user
USER node


# Expose the application's port
EXPOSE 8080

# Run the application
CMD ["npx", "nodemon", "-L", "app.js"]
