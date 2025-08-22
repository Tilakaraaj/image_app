# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy rest of app
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD ["node", "server.js"]
