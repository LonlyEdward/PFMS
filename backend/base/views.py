from rest_framework import viewsets, status
from rest_framework.generics import GenericAPIView
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import *
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction


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
        serializer.save(customuser=self.request.user)


class BudgetEntryViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = BudgetEntrySerializer

    def get_queryset(self):
        return BudgetEntry.objects.filter(customuser=self.request.user)
    # edit this so that a user can have a budget entry but they will be retrieved based on the id of the budget


class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(customuser=self.request.user)

    def perform_create(self, serializer):
        serializer.save(customuser=self.request.user)


class TransactionTypeViewSet(ReadOnlyModelViewSet):
# class TransactionTypeViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = TransactionType.objects.all()
    serializer_class = TransactionTypeSerializer

    # def get_queryset(self):
    #     return Reminder.objects.filter(customuser=self.request.user)


class AccountTypeViewSet(ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated,)
    queryset = AccountType.objects.all()
    serializer_class = AccountTypeSerializer


class TransferFunds(APIView):
    # permission_classes = (IsAuthenticated,)

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
