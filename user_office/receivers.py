from django.dispatch import receiver

from .signals import txn_mined
from blockchain.ico.services.kyc import ApproveMinedKYC


@receiver(txn_mined)
def txn_mined_callback(sender, **kwargs):
    txn_object = kwargs['transaction']

    if txn_object.txn_type == 'PASS_KYC':
        ApproveMinedKYC()(txn_object)
