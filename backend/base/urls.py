
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView,)
from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, BudgetEntryViewSet, ReminderViewSet, TransactionViewSet, AccountTypeViewSet, AccountViewSet, TransactionTypeViewSet, TransferViewSet, TransferFunds

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet)
router.register(r'budgetentries', BudgetEntryViewSet)
router.register(r'reminders', ReminderViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'accounttype', AccountTypeViewSet)
router.register(r'accounts', AccountViewSet)
router.register(r'transactiontype', TransactionTypeViewSet)
router.register(r'transfers', TransferViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('transfer/', TransferFunds.as_view(), name='transfer-funds'),

    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
