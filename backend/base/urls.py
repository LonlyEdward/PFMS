
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView,)
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet, basename='budget')
router.register(r'budgetentries', BudgetEntryViewSet, basename='budgetentry')
router.register(r'reminders', ReminderViewSet, basename='reminder')
router.register(r'transactions', TransactionViewSet, basename='transaction')
router.register(r'accounttype', AccountTypeViewSet)
router.register(r'accounts', AccountViewSet, basename='account')
router.register(r'transactiontype', TransactionTypeViewSet,
                basename='transactiontype')
router.register(r'transfers', TransferViewSet, basename='transfer')

urlpatterns = [
    path('', include(router.urls)),
    path("register/", UserRegistrationAPIView.as_view(), name="register-user"),
    path("login/", UserLoginAPIView.as_view(), name="login-user"),
    path("logout/", UserLogoutAPIView.as_view(), name="logout-user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('transfer/', TransferFunds.as_view(), name='transfer-funds'),
]
