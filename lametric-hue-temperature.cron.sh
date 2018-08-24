#!/usr/bin/env bash
HUE_API_KEY=<key> \
HUE_BRIDGE_IP=<ip> \
LAMETRIC_ACCESS_TOKEN=<token> \
LAMETRIC_PUSH_URL=<url> \
/usr/bin/node <path>/lametric-hue-temperature/dist/app.js 2>&1
