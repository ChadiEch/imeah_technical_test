FROM node:20-alpine

WORKDIR /

# Install bash
RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "run", "start"]
