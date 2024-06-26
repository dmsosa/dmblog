#!/bin/bash

echo env vars: $POSTGRES_USER, $POSTGRES_PASSWORD
export PGPASSWORD=$POSTGRES_PASSWORD

su postgres -c 'psql -v ON_ERROR_STOP=1' <<-EOSQL
    CREATE DATABASE dmblog;
    GRANT ALL PRIVILEGES ON DATABASE dmblog TO $POSTGRES_USER
EOSQL