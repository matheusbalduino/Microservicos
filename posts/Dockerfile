FROM node:alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

#to build the application execute: docker build . or docker build -t <name> .
# to exhibit the container run the command below
#docker run <name>
