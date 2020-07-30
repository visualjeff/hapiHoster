FROM node:lts-alpine
  
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

EXPOSE 1234

WORKDIR /home/node/app

RUN apk add curl

COPY package*.json ./

RUN npm install --production && npm cache clean --force --silent

COPY . .

COPY --chown=node:node . .

HEALTHCHECK --interval=5m --timeout=3s CMD curl -f http://localhost:1234/ || exit 1

USER node

CMD [ "node", "server.js" ]
