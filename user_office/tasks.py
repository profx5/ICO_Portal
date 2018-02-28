from ico_portal.celery import app
from .services.process_transaction import Processor

@app.task
def process_transaction(currency, txn_id, timestamp, acc_from,
                        acc_to, value, confirms):
    return Processor(currency)(txn_id, timestamp, acc_from, acc_to, value, confirms)
