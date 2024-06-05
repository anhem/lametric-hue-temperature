FROM node:22-alpine as builder

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM node:22-alpine as runtime

WORKDIR /opt/lametric-hue-temperature
COPY --from=builder /build/dist/ ./dist
COPY --from=builder /build/node_modules/ ./node_modules

CMD node /opt/lametric-hue-temperature/dist/src/app.js

