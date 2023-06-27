# Use an official Node.js runtime as the base image for building the app
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the app dependencies
RUN npm ci

# Copy the app files to the container
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Nginx image to serve the built app
FROM nginx:alpine

# Copy the built app from the previous build stage to the Nginx web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the desired port (e.g., 80) for the Nginx server
EXPOSE 80

# Start Nginx when the Docker container launches
CMD ["nginx", "-g", "daemon off;"]

