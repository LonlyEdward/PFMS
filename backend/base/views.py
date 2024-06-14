from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import User, AccountType, Account, Transfer, TransactionType, Transaction, Budget, BudgetEntry, Reminder
from .serializers import UserSerializer, AccountTypeSerializer, AccountSerializer, TransferSerializer, TransactionTypeSerializer, TransactionSerializer, BudgetSerializer, BudgetEntrySerializer, ReminderSerializer


class ReminderViewSet(viewsets.ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer


class BudgetViewSet(viewsets.ModelViewSet):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer


class BudgetEntryViewSet(viewsets.ModelViewSet):
    queryset = BudgetEntry.objects.all()
    serializer_class = BudgetEntrySerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class TransactionTypeViewSet(ReadOnlyModelViewSet):
    queryset = TransactionType.objects.all()
    serializer_class = TransactionTypeSerializer


class AccountTypeViewSet(ReadOnlyModelViewSet):
    queryset = AccountType.objects.all()
    serializer_class = AccountTypeSerializer
