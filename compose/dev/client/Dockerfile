FROM node:14

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./client/package.json .

RUN yarn
# RUN yarn build
# RUN yarn global add serve
# If you are building your code for production
# RUN npm ci --only=production