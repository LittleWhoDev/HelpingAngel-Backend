#!/bin/sh

cp .env.dev app/.env
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
