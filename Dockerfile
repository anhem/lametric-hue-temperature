FROM ubuntu:20.04 as builder

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
    apt-get install -y npm && \
    apt-get clean

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

FROM ubuntu:20.04 as runtime

RUN apt-get update && \
    apt-get install -y nodejs && \
    apt-get clean

WORKDIR /opt/lametric-hue-temperature
COPY --from=builder /build/dist/ ./dist
COPY --from=builder /build/node_modules/ ./node_modules

CMD node /opt/lametric-hue-temperature/dist/app.js

