FROM node:8.10-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 7357
CMD ["npm", "run", "server"]