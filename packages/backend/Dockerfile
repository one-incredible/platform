FROM node:8.12

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
COPY src ./src

RUN yarn install
