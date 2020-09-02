#!/bin/sh

cp .env.prod .env
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
