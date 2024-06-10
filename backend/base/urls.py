from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, BudgetEntryViewSet, ReminderViewSet

router = DefaultRouter()
router.register(r'budgets', BudgetViewSet)
router.register(r'budgetentries', BudgetEntryViewSet)
router.register(r'reminders', ReminderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
