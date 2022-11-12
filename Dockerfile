FROM node:lts-alpine3.16 as builder

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:lts-alpine3.16 as runtime

WORKDIR /opt/lametric-hue-temperature
COPY --from=builder /build/dist/ ./dist
COPY --from=builder /build/node_modules/ ./node_modules

CMD node /opt/lametric-hue-temperature/dist/app.js

