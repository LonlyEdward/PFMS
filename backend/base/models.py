from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email


class AccountType(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Account(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    balance = models.DecimalField(max_digits=10, decimal_places=2)
    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)
    customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    accounttype = models.ForeignKey(
        AccountType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Transfer(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    from_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='from_transfers')
    to_account = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='to_transfers')

    def __str__(self):
        return self.name


class TransactionType(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Transaction(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    transactiontype = models.ForeignKey(
        TransactionType, on_delete=models.CASCADE)
    # transactiontype = models.ManyToManyField(
    #     TransactionType)

    def __str__(self):
        return self.name


class Budget(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    date_created = models.DateField(auto_now_add=True)
    customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class BudgetEntry(models.Model):
    name = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Reminder(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    date = models.DateField()
    customuser = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# class Report(models.Model):
#     name = models.CharField(max_length=30)
#     date_created = models.DateField()
#     user = models.OneToOneField(User, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.name
