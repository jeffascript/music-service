FROM node:12.13.0-alpine as base

WORKDIR /app/server

COPY package*.json /app/server/

RUN npm i 

COPY . /app/server/

RUN npm run build

EXPOSE 5001

CMD ["npm", "run", "start"]