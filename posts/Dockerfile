FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

#to build the application execute: docker build . or docker build -t <name> .
#docker run <name>
