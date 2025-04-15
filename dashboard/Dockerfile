# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install 

# Copy the rest of the code
COPY . .

# Build your app (if frontend)
RUN yarn build

# Expose port
EXPOSE 3000

# Start app
CMD ["yarn", "start"]
