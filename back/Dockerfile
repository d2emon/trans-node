FROM node:14.15-alpine

WORKDIR /usr/src/app

# Setup node
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

# Installing packages
COPY package.json /usr/src/app/
RUN npm install

# Folders
COPY .babelrc ./
# COPY dist ./dist
# COPY public ./public
COPY src ./src

# Envs
ENV APP_NAME trans
ENV DEBUG trans:*
ENV MONGO_URI mongodb://mongo/trans
ENV NODE_PATH ./src
ENV PORT 3000

# Port to expose
EXPOSE $PORT

CMD ["npm", "start"]
