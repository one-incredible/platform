#! /usr/bin/env bash
set -e

docker run \
    --rm \
    -v /migrations/sql:/flyway/sql \
    boxfuse/flyway \
    -url=$DATABASE_URI \
    -user=migration \
    -password=migration \
    migrate
