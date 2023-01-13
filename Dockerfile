FROM node:18.12.1-alpine3.16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "prod"]