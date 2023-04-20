#!/bin/bash

# Start Postgres
sudo service postgresql start

# Create user and database
sudo -u postgres psql -c "CREATE USER testuser WITH PASSWORD 'testpass';"
sudo -u postgres psql -c "CREATE DATABASE test OWNER testuser;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE test TO testuser;"
