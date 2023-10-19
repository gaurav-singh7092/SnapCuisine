# Use an official Node.js runtime as the base image
FROM node:14.17.6

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on (port 3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
