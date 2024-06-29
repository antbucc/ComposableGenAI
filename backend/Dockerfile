# Use an official Node.js runtime as a parent image
FROM node:17.8

# Set the working directory
WORKDIR /backend

# Install Python and pip
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    timidity \
    libasound2-dev

# Copy the requirementsEvaluation file into the container
COPY requirementsEvaluation.txt .

# Install Python dependencies globally
RUN pip3 install --no-cache-dir -r requirementsEvaluation.txt

# Copy the requirementsplugins file into the container
COPY requirementsPlugins.txt .

# Install Python dependencies globally
RUN pip3 install -r requirementsPlugins.txt

# Copy the rest of the working directory contents into the container
COPY . .

# Install Node.js dependencies
RUN npm install

# Command to run the application
CMD ["npm", "run", "start"]
