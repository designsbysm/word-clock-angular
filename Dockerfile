FROM node:16.15.0-alpine

RUN npm install -g serve

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

CMD serve --single dist
