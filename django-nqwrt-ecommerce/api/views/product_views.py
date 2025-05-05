from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from store.models import Product
from api.serializers.product_serializers import ProductSerializer

# Create your views here.

# dev_10_3_Fruit
from drf_spectacular.utils import extend_schema,OpenApiParameter
# 함수형 뷰
@extend_schema(
    methods=['GET'], # 이 데코레이터를 적용할 HTTP 메서드
    summary='상품들을 조회', # API 요약 설명
    description='상품의 리스트를 조회하는 API입니다.', # API 상세 설명
    responses={200: ProductSerializer(many=True)}, # 응답 스키마
)
@extend_schema(
    methods=['POST'], # 이 데코레이터를 적용할 HTTP 메서드
    summary='상품을 생성', # API 요약 설명
    description='상품을 생성하는 API입니다.', # API 상세 설명
    request=ProductSerializer,
    responses={200: ProductSerializer(many=False)}, # 응답 스키마
)
# dev_29 추가 되도록
@api_view(["GET", "POST"])
def products_api(request):

    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    # 디시리얼라이져
    if request.method == "POST":
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(["GET", "PUT", "DELETE"])
def product_api(request, pk):
    product = get_object_or_404(Product, id=pk)

    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ProductSerializer(product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    elif request.method == "DELETE":
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
