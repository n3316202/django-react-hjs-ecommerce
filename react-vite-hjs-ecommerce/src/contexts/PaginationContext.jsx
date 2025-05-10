import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getProductPaging, getProducts } from "@/api/ProductApi";

//dev_10_4
// Context 생성
const PaginationContext = createContext();

// Context 사용 훅
export const usePagination = () => useContext(PaginationContext);

// Provider 컴포넌트
export const PaginationProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [category, setCategory] = useState("");

  //상태값 추가
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  
  // dev_10_5 페이징 컴포넌트를 위해 추가
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const pageSize = 10;

  // {
  //   "count": 21,
  //   "next": "http://127.0.0.1:8000/api/product-list/?ordering=-price&page=2",
  //   "previous": null,
  //   "results": [
  //       {
  //           "id": 8,
  //           "category": {
  //               "id": 4,
  //               "name": "도서"
  //           },
  //           "name": "역사",
  //           "price": "199.94",
  //           "description": "역사는(은) 도서 카테고리에 속하는 상품입니다.",
  //           "image": "http://127.0.0.1:8000/media/upload/product/%EC%97%AD%EC%82%AC_rpRPjCl.jpg",
  //           "is_sale": false,
  //           "sale_price": null
  //       },
  // 상품 목록 API 호출
  const fetchProducts = async () => {
    try {
      const response = await getProductPaging({
      page: currentPage,
      search,
      ordering,
      category,
      min_price: minPrice,
      max_price: maxPrice,
    });

      setProducts(response.data.results);
      setTotalCount(response.data.count);

    } catch (error) {
      console.error("상품 목록을 불러오는 중 오류 발생:", error);
    }
  };

  // 조건이 변경될 때마다 API 다시 호출
  useEffect(() => {
    fetchProducts();
  }, [currentPage, search, ordering, category,minPrice, maxPrice]); 

  // Context 값 제공
  return (
    <PaginationContext.Provider
      value={{
        products,
        totalCount,
        currentPage,
        setCurrentPage,
        search,
        setSearch,
        ordering,
        setOrdering,
        category,
        setCategory,
        pageSize,
        //상태값 추가
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};