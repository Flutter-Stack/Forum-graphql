FROM node:lts-alpine
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/public/files
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
# RUN mkdir -p /usr/src/app/public/uploads/pan-back
# RUN mkdir -p /usr/src/app/public/uploads/dl-front
# RUN mkdir -p /usr/src/app/public/uploads/dl-back
# RUN mkdir -p /usr/src/app/public/uploads/files/temp
WORKDIR /usr/src/app
# RUN npm install
RUN npm install -g nodemon
EXPOSE 3000
EXPOSE 3001
EXPOSE 4000

# FROM node:lts-alpine
# RUN mkdir -p /usr/src/app
# RUN mkdir -p /usr/src/app/public/files
# RUN apk update && apk upgrade && apk add --no-cache bash git openssh
# RUN mkdir -p /usr/src/app/public/uploads/pan-back
# RUN mkdir -p /usr/src/app/public/uploads/dl-front
# RUN mkdir -p /usr/src/app/public/uploads/dl-back
# RUN mkdir -p /usr/src/app/public/uploads/files/temp
# WORKDIR /usr/src/app
# RUN npm install
# RUN npm install -g yarn
# RUN apk update && apk add apt-transport-https
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
# RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
# RUN apt-get update && apt-get install yarn
# RUN yarn install
# RUN yarn global add node-gyp
# RUN yarn global add nodemon
# RUN npm install -g nodemon
# EXPOSE 3000
# EXPOSE 3001
 


# The instructions for the first stage
# FROM node:10-alpine as builder

# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

# RUN apk --no-cache add python make g++

# COPY package*.json ./
# RUN npm install

# # The instructions for second stage
# FROM node:10-alpine

# WORKDIR /usr/src/app
# COPY --from=builder node_modules node_modules

# COPY . .

# CMD [ "npm", “run”, "start:prod" ]

# https://dev.to/alex_barashkov/using-docker-for-nodejs-in-development-and-production-3cgp
# 
