# from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from .models import User, AccountType, Account, Transfer, TransactionType, Transaction, Budget, BudgetEntry, Reminder
from .serializers import UserSerializer, AccountTypeSerializer, AccountSerializer, TransferSerializer, TransactionTypeSerializer, TransactionSerializer, BudgetSerializer, BudgetentrySerializer, ReminderSerializer


# Accounts view
@api_view(['Get', 'POST'])
def account_list(request):

    if request.method == 'GET':
        accounts = Account.objects.all()
        serializer = AccountSerializer(accounts, many=True)
        return JsonResponse({'base': serializer.data})

    if request.method == 'POST':
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
