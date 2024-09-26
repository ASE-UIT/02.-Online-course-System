FROM node:21-alpine3.19

RUN mkdir -p /opt/app

WORKDIR /opt/app

RUN npm i npm@latest -g

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# Build the application
RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run migration:sync && npm run start:prod"]