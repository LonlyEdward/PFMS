from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm

# Register your models here.

from .models import CustomUser, Account, Transfer, Transaction, Budget, BudgetEntry, Reminder, AccountType, TransactionType


@admin.register(CustomUser)
class CustomAdminUser(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm

    model = CustomUser


# admin.site.register(CustomUser)
admin.site.register(AccountType)
admin.site.register(Account)
admin.site.register(Transfer)
admin.site.register(TransactionType)
admin.site.register(Transaction)
admin.site.register(Budget)
admin.site.register(BudgetEntry)
admin.site.register(Reminder)
