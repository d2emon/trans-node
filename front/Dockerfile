FROM node:13.12.0-alpine

WORKDIR /usr/src/app

# Setup node
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Installing packages
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install
RUN npm install react-scripts@3.4.1 -g

# Folders
COPY public ./public
COPY src ./src

CMD ["npm", "start"]
