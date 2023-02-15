FROM node:18-alpine3.16 as build

WORKDIR /usr/src/app

COPY . .

RUN apk update

RUN apk add --no-cache --virtual .gyp python3 make g++

RUN npm install --force 

RUN npm run build-wish-app

# This is execution only!
FROM node:18-alpine3.16
COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app

ENV PORT=4444
ENV NODE_ENV="production"

EXPOSE 4444

CMD ["node", "dist/apps/wish-app/server/main"]