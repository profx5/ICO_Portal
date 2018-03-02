celery -A ico_portal worker -B -Q events_beat -c 1 -n events_watcher
