from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=30)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name


class Account(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    date_created = models.DateField(auto_now_add=True)
    date_updated = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Transfer(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # fromAccount =
    # toAccount =

    def __str__(self):
        return self.name


class Transaction(models.Model):
    name = models.CharField(max_length=30)
    # there was a not null and blank constraint here
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Budget(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    date_created = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Reminder(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=100, null=True, blank=True)
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Report(models.Model):
    name = models.CharField(max_length=30)
    date_created = models.DateField()
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class AccountType(models.Model):
    name = models.CharField(max_length=30)
    account = models.OneToOneField(Account, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TransactionType(models.Model):
    name = models.CharField(max_length=30)
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
