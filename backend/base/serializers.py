from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email")


class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("id", "username", "email", "password1", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match!")

        password = attrs.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters!")
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return CustomUser.objects.create_user(password=password, **validated_data)


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect credentials")


class AccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountType
        fields = '__all__'


class AccountSerializer(serializers.ModelSerializer):
    accounttype_name = serializers.CharField(
        source='accounttype.name', read_only=True)
    accounttype = serializers.PrimaryKeyRelatedField(
        queryset=AccountType.objects.all(), write_only=True)

    class Meta:
        model = Account
        fields = ['id', 'name', 'description', 'balance',
                  'date_updated', 'accounttype', 'accounttype_name']
        read_only_fields = ['customuser']

    def get_accounttype_name(self, obj):
        return obj.accounttype.name


class AccountNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['id', 'name']


class TransferSerializer(serializers.ModelSerializer):
    from_account = serializers.PrimaryKeyRelatedField(
        queryset=Account.objects.all(), write_only=True)
    to_account = serializers.PrimaryKeyRelatedField(
        queryset=Account.objects.all(), write_only=True)
    from_account_details = AccountNameSerializer(
        source='from_account', read_only=True)
    to_account_details = AccountNameSerializer(
        source='to_account', read_only=True)

    class Meta:
        model = Transfer
        fields = '__all__'
        read_only_fields = ['customuser']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['from_account'] = {
            'id': instance.from_account.id,
            'name': instance.from_account.name
        }
        representation['to_account'] = {
            'id': instance.to_account.id,
            'name': instance.to_account.name
        }
        return representation


class TransactionTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionType
        fields = fields = '__all__'


class TransactionSerializer(serializers.ModelSerializer):
    transactiontype_name = serializers.CharField(
        source='transactiontype.name', read_only=True)
    transactiontype = serializers.PrimaryKeyRelatedField(
        queryset=TransactionType.objects.all(), write_only=True)

    class Meta:
        model = Transaction
        fields = ['id', 'name', 'description', 'amount',
                  'date', 'transactiontype', 'transactiontype_name']
        read_only_fields = ['customuser']


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = '__all__'
        read_only_fields = ['customuser']


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = '__all__'


class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = fields = '__all__'
        read_only_fields = ['customuser']
