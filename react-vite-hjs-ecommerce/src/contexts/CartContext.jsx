import React, { createContext, useContext, useState, useEffect } from "react";
import { addCart, deleteCart, getCarts } from "../api/CartApi";
import { useAuth } from "./AuthContext";

//dev_6_Fruit
//https://chatgpt.com/c/680873bf-67fc-8007-b7d1-08ebcbb344d4

// 🏗️ 1. Django API 준비 (예시)
// 장바구니 API는 보통 아래처럼 구성해요:
// 메서드	경로	설명
// GET	/api/cart/	장바구니 불러오기
// POST	/api/cart/	장바구니에 상품 추가
// DELETE	/api/cart/:id/	장바구니 항목 제거
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // ⭐ 로그인 유저: 서버 장바구니 불러오기 or 병합
  useEffect(() => {
    const fetchCart = async () => {
      const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");

      try {
        if (user) {   
          if (guestCart.length > 0) {
            await axios.post("/cart/merge/", guestCart);
            localStorage.removeItem("cart");
          }
          const res = await axios.get("/cart/");
          setCartItems(res.data);
        } else {
          // 비회원일 경우 localStorage
          setCartItems(guestCart);
        }
      } catch (err) {
        console.error("장바구니 불러오기 실패", err);
      }
    };

    fetchCart();
  }, [user]);

  // 🧠 localStorage 저장 (비회원일 때만)
  useEffect(() => {
    if (!user) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    console.log(localStorage.getItem("cart"))
  }, [cartItems, user]);

  // 🛒 장바구니 담기
  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        const res = await axios.post("/cart/add/", {
          product_id: product.id,
          quantity,
        });
        setCartItems(res.data); // 서버에서 최신 장바구니 응답
      } catch (err) {
        console.error("장바구니 추가 실패", err);
      }
    } else {
      // ✅ old_cart 데이터 {"34": {"quantity": 1, "price": "10000.00"}, "33": {"quantity": 1, "price": "12000.00"}}
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, quantity }];
      });
    }
  };

  // 🗑️ 장바구니 항목 제거
  const removeFromCart = async (productId) => {
    if (user) {
      try {
        const res = await axios.delete(`/cart/remove/${productId}/`);
        setCartItems(res.data);
      } catch (err) {
        console.error("장바구니 삭제 실패", err);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
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
        setCartItems(res.data);
      } catch (err) {
        console.error("수량 변경 실패", err);
      }
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // 🚮 전체 비우기
  const clearCart = async () => {
    if (user) {
      try {
        await axios.delete("/cart/clear/");
        setCartItems([]);
      } catch (err) {
        console.error("장바구니 비우기 실패", err);
      }
    } else {
      setCartItems([]);
      localStorage.removeItem("cart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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