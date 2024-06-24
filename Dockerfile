FROM node:16.14.0 AS builder

# Update the package repositories and install git
RUN apt-get update && apt-get install -y git bash

WORKDIR /frontend

# Copy the package.json file and install dependencies
COPY ./package.json /frontend/
RUN npm install --force
RUN npm install -g serve
RUN npm install serve@11.3.2 --save

# Copy the rest of the application files
COPY . /frontend

# Build the application
RUN npm run build
