import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "@/api/ProductApi";

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

  const pageSize = 10;

  // 상품 목록 API 호출
  const fetchProducts = async () => {
    try {
      const response = await getProducts({
      page: currentPage,
      search,
      ordering,
      category,
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
  }, [currentPage, search, ordering, category]);

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
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};