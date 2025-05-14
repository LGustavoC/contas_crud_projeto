FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install @vitejs/plugin-react

RUN npm install xlsx

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start"]
