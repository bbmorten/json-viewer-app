FROM node:20.5.0

# Install Python
RUN apt-get update && \
    apt-get install -y python3-full python3-pip



# Set the working directory
WORKDIR /app

# Install Node.js dependencies first for caching
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

EXPOSE ${SRV_PORT}

# Run your application when the container launches
CMD ["node", "app.js"]