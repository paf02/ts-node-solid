FROM node:8.9.4

WORKDIR /usr/application

COPY . /usr/application/

RUN npm install
RUN npm run build

ENTRYPOINT [ "npm", "run", "dev" ]