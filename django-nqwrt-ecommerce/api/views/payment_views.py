import json
from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.response import Response
from rest_framework import status

from cart.cart import CartDRF
from orders.forms import ShippingForm
from orders.models import Order, OrderItem
from payment.models import Payment
from store.models import Product
from api.serializers.payment_serializers import PaymentSerializer, ShippingAddressSerializer
from rest_framework import viewsets

# Create your views here.


# dev_9_Fruit
class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    # create 커스텀 마이징
    def create(self, request, *args, **kwargs):
    

        try:
            user = request.user
            imp_uid = request.data.get("imp_uid")
            paid_amount = request.data.get("paid_amount")
            shipping_data = request.data.get("shippingData")

            print(user)
            print(imp_uid)
            print(paid_amount)
            print(shipping_data)
           

            # 1. 주문 생성
            order = Order.objects.create(
                user=user,
                amount_paid=paid_amount,
            )

            print("1. 주문 생성 완료")
            # 2. 배송지 저장 (user, order를 함께 저장)
            shipping_serializer = ShippingAddressSerializer(data=shipping_data)
            shipping_serializer.is_valid(raise_exception=True)
            shipping = shipping_serializer.save(user=user, order=order)

            print("2. 배송지 저장 완료")

            # 3. 결제 저장 (serializer 사용 가능)
            payment_serializer = self.get_serializer(
                data={
                    "imp_uid": imp_uid,
                    "user": user.id,
                    "order": order.id,
                    "paid_amount": paid_amount,
                }
            )
            payment_serializer.is_valid(raise_exception=True)
            payment = payment_serializer.save()

            print("3. 결제 저장 완료")

            # 4. 응답 반환
            return Response(
                {
                    "message": "✅ 결제 및 주문 저장 성공",
                    "order_id": order.id,
                    "payment_id": payment.id,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            print(e)
            return Response(
                {
                    "error": str(e),
                    "detail": "❌ 결제 처리 중 오류가 발생했습니다.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        