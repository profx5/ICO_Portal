#!/usr/bin/env python
# flake8: noqa
import django
django.setup()

from oslash import Right
from blockchain.ico.contracts.token import TokenContract, TransfersFilter
from blockchain.ico.services import ProcessTransfer
from blockchain.web3 import get_web3
from django.db.models import Max
from datetime import datetime

from user_office.models import EventsProcessing, Transfer

web3 = get_web3()

contract = TokenContract()

start_block = 5900000
end_block = web3.eth.blockNumber
step = 100000
steps = int((end_block - start_block) / step) + 2

while start_block < web3.eth.blockNumber:
    filter = contract.get_filter(from_block = start_block, to_block=start_block + step)
    wrapped_filter = TransfersFilter(web3, filter.filter_id)

    print(f'Gettings entries from {start_block} to {start_block + step}')
    entries = wrapped_filter.get_all_entries()
    print(f'Got {len(entries)} entries')
    for i in entries:
        print(f'Processing {i}')
        result = ProcessTransfer()(i)

        if isinstance(result, Right):
            print(f'{i} sucessfully processed')
        else:
            print(f'Error while processing {i}, {result.value}')

    start_block += step

result = Transfer.objects.all().aggregate(block=Max('block_number'))

if result['block']:
    max_block = result['block']
else:
    raise Exception('Max block not found')

events_processing = EventsProcessing(filter_id=f'syncing_events_{datetime.utcnow().isoformat()}',
                                     from_block=start_block,
                                     last_processed_block=max_block)
events_processing.save()

print(f'Created EventsProcessing with id={events_processing.id}')
