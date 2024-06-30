
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView,)
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet, basename='budget')
# router.register(r'budgetentries', BudgetEntryList, basename='budgetentry')/
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
    path('budgets/<int:budget_id>/entries/',
         BudgetEntryList.as_view(), name='budget-entry-list'),
    path('budget-entries/create/', BudgetEntryCreate.as_view(),
         name='budget-entry-create'),
    path("user", UserInfoAPIView.as_view(), name="user-info"),
    path('counts/', CountsView.as_view(), name='counts'),
    path('recent-transactions/', RecentTransactionsView.as_view(),
         name='recent-transactions'),
    path('budgets/<int:pk>/summary/',
         BudgetSummaryView.as_view(), name='budget-summary')
]
