FROM node:8.12

RUN mkdir /app
WORKDIR /app

COPY src package.json yarn.lock ./

RUN yarn install
