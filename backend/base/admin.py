from django.contrib import admin

# Register your models here.

from .models import User, Account, Transfer, Transaction, Budget, BudgetEntry, Reminder, Report, TransactionType

admin.site.register(User)
admin.site.register(Account)
admin.site.register(Transfer)
admin.site.register(TransactionType)
admin.site.register(Transaction)
admin.site.register(Budget)
admin.site.register(BudgetEntry)
admin.site.register(Reminder)
admin.site.register(Report)
# admin.site.register(TransactionType)
