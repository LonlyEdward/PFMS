from rest_framework import serializers
from .models import User, AccountType, Account, Transfer, TransactionType, Transaction, Budget, BudgetEntry, Reminder


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class AccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = fields = ['id', 'name', 'description',
                           'balance', 'date_created']


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = fields = ['id', 'name', 'description',
                           'amount', 'from_account', 'to_account']


class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = fields = ['__all__']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = fields = ['id', 'name', 'description', 'amount', 'date']


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'name', 'description', 'amount',
                  'start_date', 'end_date', 'date_created']


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = ['id', 'name', 'amount']


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = ['id', 'name', 'description', 'date', 'user']
        # fields = fields = ['__all__']
