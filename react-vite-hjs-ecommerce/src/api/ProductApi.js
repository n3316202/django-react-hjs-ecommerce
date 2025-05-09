import http from './HttpCommon';

//dev_4_Fruit
// export const getProducts = () => {
//   return http.get('/api/products/');
// };

export const getProductById = (id) => {
  return http.get(`/api/product/${id}/`);
};

//dev_10_4_Fruit
// 조건부 파라미터를 받아서 요청
export const getProducts = ({ page = 1, search = "", ordering = "", category = "" }) => {
  return http.get("/api/products/", {
    params: {
      page,
      search,
      ordering,
      category,
    },
  });
};
