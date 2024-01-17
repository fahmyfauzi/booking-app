# Fetching the minified node image on apline linux
FROM node:16

# Setting up the work directory
WORKDIR /usr/src/app

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Exposing server port
EXPOSE 3000

# Starting our application
CMD [ "npm", "run","start" ]
