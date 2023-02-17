FROM node:14

# Set up working dir
WORKDIR /app

# Copying source files
COPY . .

# Copy package json files and install
COPY package*.json ./
RUN npm install --no-audit

EXPOSE 3001

# Actual timezone env variable set
ENV TZ Europe/Madrid

CMD ["npm", "start"]
