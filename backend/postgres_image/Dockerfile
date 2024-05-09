FROM postgres:16
MAINTAINER Durian Sosa <dmsosa21@outlook.com>

ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

COPY ./pg-entrypoint.sh ./docker-entrypoint-initdb.d/

RUN apt-get update && apt-get dist-upgrade -y --force-yes && \
    apt-get install dos2unix && \
    apt-get autoremove -y && apt-get clean && \
    cd docker-entrypoint-initdb.d && \
    dos2unix -n ./pg-entrypoint.sh ./pg-entrypointx.sh && \
    chmod 755 ./pg-entrypointx.sh && \
    rm -rf /var/cache/* && rm -rf /var/lib/apt/lists/* && rm ./pg-entrypoint.sh

HEALTHCHECK --start-period=5s --retries=3 CMD pg_isready -d $POSTGRES_USER

EXPOSE 5000:5432
