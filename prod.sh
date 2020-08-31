#!/bin/sh

# TODO: production env not working
cp .env.prod .env && docker-compose -f docker-compose.prod.yml up -d
