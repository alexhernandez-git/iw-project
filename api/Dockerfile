
FROM node:14

WORKDIR /api

COPY ./package*.json ./
RUN npm install
RUN npm install bcrypt
RUN npm rebuild bcrypt --build-from-source

COPY ./ ./

