import http from './HttpCommon';

//dev_4_Fruit
export const getProducts = () => {
  return http.get('/api/products/');
};

export const getProductById = (id) => {
  return http.get(`/api/product/${id}/`);
};