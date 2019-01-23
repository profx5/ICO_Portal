from django.dispatch import receiver

from .signals import txn_mined
from blockchain.ico.services import ApproveMinedKYC

@receiver(txn_mined)
def txn_mined_callback(sender, **kwargs):
    txn_object = kwargs['transaction']

    if txn_object.txn_type == 'CREATE_PROXY':
        ApproveMinedKYC()(txn_object)
