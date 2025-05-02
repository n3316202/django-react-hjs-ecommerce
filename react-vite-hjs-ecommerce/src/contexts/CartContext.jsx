import React, { createContext, useContext, useEffect, useState } from "react";
import { addCart, deleteCart, getCarts, mergeCart } from "../api/CartApi";
import { useAuth } from "./AuthContext";

//dev_6_Fruit
//https://chatgpt.com/c/680873bf-67fc-8007-b7d1-08ebcbb344d4

// 🏗️ 1. Django API 준비 (예시)
// 장바구니 API는 보통 아래처럼 구성해요:
// 메서드	경로	설명
// GET	/api/cart/	장바구니 불러오기
// POST	/api/cart/	장바구니에 상품 추가
// DELETE	/api/cart/:id/	장바구니 항목 제거

//비로그인을 위한 구성
// {
//   "cart": {
//     "1": { "price": "12000", "quantity": 2 },
//     "2": { "price": "4500", "quantity": 3 }
//   },
// }

// self.cart = {
//     "1":{"quantity":7,"price":"3000.00"}
//     "2":{"quantity":1,"price":"5000.00"}
//  }

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const { user } = useAuth();


  // 비회원 -> localStorage 에서 가져오기
  useEffect(() => {
    if (!user) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  }, [user]);

  // 로그인 시 병합
  useEffect(() => {

    const fetchCart = async () => {

      if (user) {
        const guestCart = JSON.parse(localStorage.getItem("cart") || "{}");

        try {
          if (Object.keys(guestCart).length > 0) {
            await mergeCart(localStorage.getItem("cart"))
            localStorage.removeItem("cart");
          }

          loadCart()
         
        } catch (err) {
          console.error("장바구니 병합/불러오기 실패", err);
        }
      }
    };

    fetchCart();
  }, [user]);

  // 비회원일 때 localStorage 저장
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      console.log("🛒 savedCart:", localStorage.getItem("cart"));
    }

  }, [cartItems, user]);

  
  // 장바구니 불러오기
  const loadCart = async () => {
    try {
      const response = await getCarts();
      console.log("음메")
      console.log(response)
      // 서버 응답: 배열일 경우 변환
      const cartData = {};
      response.data.cart.forEach((item) => {
        cartData[item.product.id] = {
          quantity: item.quantity,
          price: item.price,
        };
      });

      setCartItems(cartData);

    } catch (error) {
      console.error("❌ 장바구니 불러오기 실패", error);
    }
  };


  // ✅ 장바구니 추가
  const addToCart = async (product, quantity = 1) => {
    const productId = product.id;
    const price = product.price;

    if (user) {
      try {
        
        const response = await addCart(product.id, quantity);
        console.log(response)

        loadCart()
        
      } catch (err) {
        console.error("서버 장바구니 추가 실패", err);
      }
    } else {
        setCartItems((prev) => {
        const existing = prev[productId];
        return {
          ...prev,
          [productId]: {
            price,
            quantity: existing ? existing.quantity + quantity : quantity,
          },
        };
        
      });
    }
  };

  // ❌ 항목 제거
  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const res = await axios.delete(`/cart/remove/${productId}/`);
        const updated = {};
        res.data.forEach((item) => {
          updated[item.product_id] = {
            quantity: item.quantity,
            price: item.price,
          };
        });
        setCartItems(updated);
      } catch (err) {
        console.error("서버 장바구니 삭제 실패", err);
      }
    } else {
      setCartItems((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  // 🔄 수량 변경
  const updateQuantity = async (productId, quantity) => {
    if (user) {
      try {
        const res = await axios.put("/cart/update/", {
          product_id: productId,
          quantity,
        });
        const updated = {};
        res.data.forEach((item) => {
          updated[item.product_id] = {
            quantity: item.quantity,
            price: item.price,
          };
        });
        setCartItems(updated);
      } catch (err) {
        console.error("서버 수량 변경 실패", err);
      }
    } else {
      setCartItems((prev) => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          quantity,
        },
      }));
    }
  };

  // 🧹 전체 비우기
  const clearCart = async () => {
    if (user) {
      try {
        await axios.delete("/cart/clear/");
        setCartItems({});
      } catch (err) {
        console.error("서버 장바구니 비우기 실패", err);
      }
    } else {
      setCartItems({});
      localStorage.removeItem("cart");
    }
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getTotalItems, // ✅ 여기!
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

//https://chatgpt.com/c/680873bf-67fc-8007-b7d1-08ebcbb344d4