import http from './HttpCommon';

//dev_4_Fruit
export const getProducts = () => {
  return http.get('/api/products/');
};

export const getProductById = (id) => {
  return http.get(`/api/product/${id}/`);
};

//dev_10_4_Fruit
// 조건부 파라미터를 받아서 요청
// export const getProductPaging = ({ page = 1, search = "", ordering = "", category = "" }) => {
//   return http.get("/api/product-list/", {
//     params: {
//       page,
//       search,
//       ordering,
//       category,
//     },
//   });
// };

export const getProductPaging = ({
  page = 1,
  search = "",
  ordering = "",
  category = "",
  min_price = 0,
  max_price = null,
}) => {
  
  const params = {
    page,
    search,
    ordering,
    category,
  };

  if (min_price !== null) params.min_price = min_price;
  if (max_price !== null) params.max_price = max_price;

  return http.get("/api/product-list/", { params });
};


export const getProductMaxPrice = () => {
  return http.get(`/api/product-list/max-price/`);
};