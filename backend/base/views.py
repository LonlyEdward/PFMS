from rest_framework import viewsets
from rest_framework.viewsets import ReadOnlyModelViewSet
from .models import User, AccountType, Account, Transfer, TransactionType, Transaction, Budget, BudgetEntry, Reminder
from .serializers import UserSerializer, AccountTypeSerializer, AccountSerializer, TransferSerializer, TransactionTypeSerializer, TransactionSerializer, BudgetSerializer, BudgetEntrySerializer, ReminderSerializer
from rest_framework.response import Response
# from rest_framework.decorators import api_view

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from .models import Account, Transfer
from django.db import transaction
# from .serializers import TransferSerializer


# @api_view(['GET'])
# def get_routes(request):
#     """returns a view containing all the possible routes"""
#     routes = [
#         '/api/token',
#         '/api/token/refresh'
#     ]

#     return Response(routes)


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


class TransferFunds(APIView):
    def post(self, request):
        serializer = TransferSerializer(data=request.data)
        if serializer.is_valid():
            from_account_id = serializer.validated_data['from_account']
            to_account_id = serializer.validated_data['to_account']
            amount = serializer.validated_data['amount']

            try:
                with transaction.atomic():
                    from_account = Account.objects.select_for_update().get(id=from_account_id)
                    to_account = Account.objects.select_for_update().get(id=to_account_id)

                    if from_account.balance < amount:
                        return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)

                    from_account.balance -= amount
                    to_account.balance += amount

                    from_account.save()
                    to_account.save()

                    transfer = Transfer.objects.create(
                        from_account=from_account,
                        to_account=to_account,
                        amount=amount
                    )
                return Response({"success": "Transfer completed"}, status=status.HTTP_200_OK)
            except Account.DoesNotExist:
                return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)