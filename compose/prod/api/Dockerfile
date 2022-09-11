
FROM node:14

# Create app directory
WORKDIR /app

RUN npm install
RUN npm install nodemon -g
RUN npm install jest -g
RUN npm install typescript -g

# Create app directory  
COPY ./api .

RUN yarn
RUN yarn build

# If you are building your code for production
# RUN npm ci --only=production