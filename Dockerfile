FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Optional: install Nest CLI globally if you want
RUN npm install -g @nestjs/cli

# Expose port
EXPOSE 3000

# Start NestJS in watch mode for hot-reload
CMD ["npm", "run", "start:dev"]
