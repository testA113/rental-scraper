FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update && apt-get install -y libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libasound2
RUN npm install --only=production
COPY data ./data
COPY src ./src
COPY index.js ./
EXPOSE 8080
CMD [ "node", "index.js" ]