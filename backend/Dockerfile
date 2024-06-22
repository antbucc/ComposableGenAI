# Use an official Node.js runtime as a parent image
FROM node:17.8

# Set the working directory
WORKDIR /backend

# Install Python and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install Python dependencies globally
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the working directory contents into the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Command to run the application
CMD ["npm", "run", "start"]
