#!/bin/bash

echo "Running migrations"
python manage.py migrate

echo "Starting Gunicorn"
gunicorn ico_portal.wsgi:application \
         --bind 0.0.0.0:8000 \
         --workers 3
