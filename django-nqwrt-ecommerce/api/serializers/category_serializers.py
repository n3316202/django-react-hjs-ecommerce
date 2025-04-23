from rest_framework import serializers
from store.models import Category, Product
from api.serializers.product_serializers import ProductSimpleSerializer


# dev_6_Fruit
class CategorySimpleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ["id", "name"]


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = "__all__"
