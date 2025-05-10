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

from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

#dev_10_4_Fruit
# 페이지네이션 클래스 (옵션)
# ✅ 요청 예시
# /api/product-list/?page=2	페이지 2
# /api/product-list/?search=포도	'포도' 포함 검색
# /api/product-list/?category=4	카테고리 ID가 4번인 상품 필터링
# /api/product-list/?ordering=price	가격 오름차순 정렬
# /api/product-list/?ordering=-id	최신순 정렬

class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

# 읽기 전용 ViewSet 
# POST 추가 가능 필요시
# ModelViewSet
class ProductViewSet(viewsets.ReadOnlyModelViewSet):  
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    # 필터링/검색/정렬 backends 설정
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    # 필터링 항목 (URL에서 ?category=값 으로 필터링 가능)
    filterset_fields = ['category']

    # 검색 필드 (?search=아이폰)
    search_fields = ['name', 'description']  # 필요에 따라 수정 가능

    # 정렬 필드 (?ordering=price 또는 ?ordering=-created)
    ordering_fields = ['id','price', 'name']
    ordering = ['id']  # 기본 정렬