FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install 

RUN npm install nodemon

EXPOSE 5000

ENV URI <YOUR_URI>

CMD ["npm", "run", "backend"]


