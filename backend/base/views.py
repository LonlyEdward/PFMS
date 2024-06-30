from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView


class CountsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        data = {
            "transactions": Transaction.objects.filter(customuser=user).count(),
            "reminders": Reminder.objects.filter(customuser=user).count(),
            "bank_accounts": Account.objects.filter(customuser=user).count(),
            "budgets": Budget.objects.filter(customuser=user).count()
        }
        return Response(data)


class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh": str(
            token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data = serializer.data
        data["tokens"] = {"refresh": str(
            token), "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)


class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ReminderViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = ReminderSerializer

    def get_queryset(self):
        return Reminder.objects.filter(customuser=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user)


class BudgetViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = BudgetSerializer

    def get_queryset(self):
        return Budget.objects.filter(customuser=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user)


class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AccountSerializer

    def get_queryset(self):
        return Account.objects.filter(customuser=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user)


class TransferViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransferSerializer

    def get_queryset(self):
        return Transfer.objects.filter(customuser=self.request.user)

    def perform_create(self, serializer):
        from_account = serializer.validated_data['from_account']
        to_account = serializer.validated_data['to_account']
        amount = serializer.validated_data['amount']

        # Ensure user owns the accounts
        if from_account.customuser != self.request.user or to_account.customuser != self.request.user:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check if the from_account has sufficient balance
        if from_account.balance < amount:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Check if from_account and to_account are the same
        if from_account == to_account:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Perform the transfer
        from_account.balance -= amount
        to_account.balance += amount
        from_account.save()
        to_account.save()

        serializer.save(customuser=self.request.user)


class BudgetEntryCreate(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = BudgetEntrySerializer


class BudgetSummaryView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        budget = Budget.objects.get(pk=pk, customuser=request.user)
        total_entries_amount = budget.total_entries_amount()

        # Serialize budget entries
        entries = budget.entries.all()
        serialized_entries = BudgetEntrySerializer(entries, many=True).data

        data = {
            "name": budget.name,
            "description": budget.description,
            "amount": budget.amount,
            "start_date": budget.start_date,
            "end_date": budget.end_date,
            "total_entries_amount": total_entries_amount,
            "is_exceeded": total_entries_amount > budget.amount,
            "exceeded_amount": max(0, total_entries_amount - budget.amount),
            "entries": serialized_entries  # Include the serialized entries
        }
        return Response(data)


class BudgetEntryList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = BudgetEntrySerializer

    def get_queryset(self):
        budget_id = self.kwargs['budget_id']
        return BudgetEntry.objects.filter(budget_id=budget_id)


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerializer

    # def get_queryset(self):
    #     return Transaction.objects.filter(customuser=self.request.user)

    def get_queryset(self):
        user = self.request.user
        queryset = Transaction.objects.filter(customuser=user)

        month = self.request.query_params.get('month')
        if month:
            queryset = queryset.filter(date__month=month)

        transaction_type = self.request.query_params.get('type')
        if transaction_type:
            queryset = queryset.filter(transactiontype=transaction_type)

        return queryset

    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user)


class TransactionTypeViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TransactionType.objects.all()
    serializer_class = TransactionTypeSerializer


class AccountTypeViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = AccountType.objects.all()
    serializer_class = AccountTypeSerializer


class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


class RecentTransactionsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        # Query the most recent transactions, limit to 4
        recent_transactions = Transaction.objects.filter(
            customuser=request.user
        ).order_by('-date')[:5]

        # Serialize the transactions data
        data = [
            {
                'id': transaction.id,
                'date': transaction.date,
                'name': transaction.name,
                'amount': transaction.amount,
                'description': transaction.description,
            }
            for transaction in recent_transactions
        ]

        return Response(data)
