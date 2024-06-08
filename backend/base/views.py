from django.shortcuts import render
from django.db import transaction
from .models import Transfer

# Create your views here.

def transfer_funds(from_account, to_account, amount):
    if from_account == to_account:
        raise ValueError("Cannot transfer funds between the same account.")
    if amount <= 0:
        raise ValueError("Transfer amount must be positive.")

    with transaction.atomic():  # Ensure data integrity
        from_account.balance -= amount
        from_account.save()
        to_account.balance += amount
        to_account.save()

    # Create a new Transfer object after successful transaction
    transfer = Transfer.objects.create(from_account=from_account, to_account=to_account, amount=amount)
    return transfer