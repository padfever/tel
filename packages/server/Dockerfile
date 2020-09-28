FROM node:12.6.0-alpine

USER root
ENV NODE_ENV development

RUN apk add --no-cache --virtual .persistent-deps curl openssl make gcc g++ python py-pip git

RUN mkdir -p /app
RUN chown node:node /app

USER node
WORKDIR /app

COPY ./package*.json ./

RUN npm i

COPY . ./

USER root
ENV NODE_ENV production
ENV app__port 80
EXPOSE 80

# Required for /bin/env ts-node invocations to work
RUN ln -sf /app/node_modules/.bin/ts-node /usr/local/bin/ts-node

CMD ts-node src/main

