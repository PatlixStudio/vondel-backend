FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]