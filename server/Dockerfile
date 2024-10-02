# Server Dockerfile
FROM node:16

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the server
EXPOSE 5000

# Start the server using `npm run dev`
CMD ["npm", "run", "dev"]
