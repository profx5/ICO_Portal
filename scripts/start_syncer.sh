#!/bin/bash

set -e
echo "Running migrations"

# wait db
maxTries=10
while [ "$maxTries" -gt 0 ] && ! python manage.py migrate; do
    sleep 1
done
echo
if [ "$maxTries" -le 0 ]; then
    echo >&2 'error: unable to contact migrate db after 10 tries'
    exit 1
fi

echo "Starting syncer"
./sync_events.py
