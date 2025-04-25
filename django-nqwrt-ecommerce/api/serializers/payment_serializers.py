from importlib.resources import read_binary
from itertools import product
from django.db import transaction
from rest_framework import serializers

from orders.models import ShippingAddress
from payment.models import Payment
from store.models import Category, Product


# dev_9_Fruit
class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payment
        fields = "__all__"  # user, order 포함됨


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        # fields = "__all__"
        exclude = ["user", "order"]
