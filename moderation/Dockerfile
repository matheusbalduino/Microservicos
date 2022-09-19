FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

#docker build -t microservices/moderation
#docker run microservices/moderation