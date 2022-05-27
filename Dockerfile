FROM node:14-alpine as base

WORKDIR /app

COPY package*.json /app/

RUN npm i 

COPY . /app/

RUN npm run build

EXPOSE 5003

CMD ["npm", "run", "demo"]