#!/bin/sh

cp .env.dev .env
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
