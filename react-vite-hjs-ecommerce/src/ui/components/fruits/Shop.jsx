import { getCategories } from '@/api/CategoryApi'
import { getProductMaxPrice } from '@/api/ProductApi'
import { usePagination } from '@/contexts/PaginationContext'
import React, { useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import { Link } from 'react-router-dom'

// {
//     "count": 21,
//     "next": "http://127.0.0.1:8000/api/product-list/?ordering=-price&page=2",
//     "previous": null,
//     "results": [
//         {
//             "id": 8,
//             "category": {
//                 "id": 4,
//                 "name": "도서"
//             },
//             "name": "역사",
//             "price": "199.94",
//             "description": "역사는(은) 도서 카테고리에 속하는 상품입니다.",
//             "image": "http://127.0.0.1:8000/media/upload/product/%EC%97%AD%EC%82%AC_rpRPjCl.jpg",
//             "is_sale": false,
//             "sale_price": null
//         },

//http://localhost:8000/api/categories/
    // {
    //     "id": 9,
    //     "products": [
    //         {
    //             "id": 22,
    //             "name": "냉장고",
    //             "price": "117.02",
    //             "description": "냉장고는(은) 전자제품 카테고리에 속하는 상품입니다.",
    //             "image": null,
    //             "is_sale": true,
    //             "sale_price": 93,
    //             "category": 9
    //         },
    //         {
    //             "id": 23,
    //             "name": "컴퓨터",
    //             "price": "55.75",
    //             "description": "컴퓨터는(은) 전자제품 카테고리에 속하는 상품입니다.",
    //             "image": "http://localhost:8000/media/upload/product/%EC%BB%B4%ED%93%A8%ED%84%B0_7fkv00F.jpg",
    //             "is_sale": true,
    //             "sale_price": 44,
    //             "category": 9
    //         },

//dev_10_4_Fruit
const Shop = () => {

  const { products, search, setSearch, ordering, setOrdering, category, setCategory, maxPrice, setMaxPrice, setMinPrice } = usePagination();
  //console.log(products)
  
  const [categories, setCategories] = useState([]);

  const [limitPrice, setLimitPrice] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {    
    //http://localhost:8000/api/categories/
    getCategories()
    .then(res => setCategories(res.data))
    .catch(err => console.log(err))
  }, []);

  // 서버에서 최대 가격 가져오기
  useEffect(() => {
    const fetchMaxPrice = async () => {
      try {
        const response = await getProductMaxPrice();
        const fetchedMax = response.data.max_price;
        setLimitPrice(fetchedMax);
      } catch (error) {
        console.error("최대 가격을 가져오는 중 오류 발생:", error);
      }
    };
    fetchMaxPrice();
  }, [limitPrice]);


  // const handlePriceChange = (e) => {
  //   setPrice(e.target.value);
  // };

  
  // 슬라이더 값 변경 시
  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    console.log(value)
    setPrice(value);
    setMinPrice(0);
    setMaxPrice(value);
    
  };

  const handleSearchChange = (e) => setSearch(e.target.value);
  // const handleSearchChange = (e) => setSearch(e.target.value);
  const handleOrderingChange = (e) => setOrdering(e.target.value);
  const handleCategoryClick = (categoryId) => setCategory(categoryId);
  // const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

return (  
<>
  {/* Fruits Shop Start*/}
  <div className="container-fluid fruite py-5">
    <div className="container py-5">
      <h1 className="mb-4">Fresh fruits shop</h1>
      <div className="row g-4">
        <div className="col-lg-12">
          <div className="row g-4">
            <div className="col-xl-3">
              <div className="input-group w-100 mx-auto d-flex">
                <input
                  onChange={handleSearchChange}
                  type="search"
                  className="form-control p-3"
                  placeholder="keywords"
                  aria-describedby="search-icon-1"
                />
                <span id="search-icon-1" className="input-group-text p-3">
                  <i className="fa fa-search" />
                </span>
              </div>
            </div>
            <div className="col-6" />
            <div className="col-xl-3">
              <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                <label htmlFor="fruits">Default Sorting:</label>
                <select
                  id="fruits"
                  name="fruitlist"
                  className="border-0 form-select-sm bg-light me-3"
                  form="fruitform"
                  onChange={handleOrderingChange}
                >
                  <option value="volvo">정렬선택</option>
                  <option value="price">가격 낮은순</option>
                  <option value="-price">가격 높은순</option>
                  <option value="id">등록순</option>
                  <option value="-id">최신순</option>                  
                </select>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <h4>Categories</h4>
                    <ul className="list-unstyled fruite-categorie">
                      
                      { categories && categories.map((categorie,index) =>(
                        <li key={index} >
                          {/* style={{ cursor: 'pointer' }}  // 클릭 가능한 UI */}
                          <div onClick={() => handleCategoryClick(categorie.id)} style={{ cursor: 'pointer' }}   className="d-flex justify-content-between fruite-name">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fas fa-apple-alt me-2" />
                              {categorie.name}
                            </a>
                            <span>({categorie.products.length})</span>
                          </div>
                        </li>
                      ))}          
                   
                      
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <h4 className="mb-2">Price</h4>
                    <input
                      type="range"
                      className="form-range w-100"
                      id="rangeInput"
                      name="rangeInput"
                      min={0}
                      max={limitPrice}
                      defaultValue={0}
                      onChange={handlePriceChange} 
                      oninput="amount.value=rangeInput.value"
                    />
                    <output
                      id="amount"
                      name="amount"
                      min-velue={0}
                      max-value={limitPrice}
                      htmlFor="rangeInput"
                    >
                      {price}
                    </output>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <h4>Additional</h4>
                    <div className="mb-2">
                      <input
                        type="radio"
                        className="me-2"
                        id="Categories-1"
                        name="Categories-1"
                        defaultValue="Beverages"
                      />
                      <label htmlFor="Categories-1"> Organic</label>
                    </div>
                    <div className="mb-2">
                      <input
                        type="radio"
                        className="me-2"
                        id="Categories-2"
                        name="Categories-1"
                        defaultValue="Beverages"
                      />
                      <label htmlFor="Categories-2"> Fresh</label>
                    </div>
                    <div className="mb-2">
                      <input
                        type="radio"
                        className="me-2"
                        id="Categories-3"
                        name="Categories-1"
                        defaultValue="Beverages"
                      />
                      <label htmlFor="Categories-3"> Sales</label>
                    </div>
                    <div className="mb-2">
                      <input
                        type="radio"
                        className="me-2"
                        id="Categories-4"
                        name="Categories-1"
                        defaultValue="Beverages"
                      />
                      <label htmlFor="Categories-4"> Discount</label>
                    </div>
                    <div className="mb-2">
                      <input
                        type="radio"
                        className="me-2"
                        id="Categories-5"
                        name="Categories-1"
                        defaultValue="Beverages"
                      />
                      <label htmlFor="Categories-5"> Expired</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <h4 className="mb-3">Featured products</h4>
                  <div className="d-flex align-items-center justify-content-start">
                    <div
                      className="rounded me-4"
                      style={{ width: 100, height: 100 }}
                    >
                      <img
                        src="img/featur-1.jpg"
                        className="img-fluid rounded"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">
                          4.11 $
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div
                      className="rounded me-4"
                      style={{ width: 100, height: 100 }}
                    >
                      <img
                        src="img/featur-2.jpg"
                        className="img-fluid rounded"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">
                          4.11 $
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-start">
                    <div
                      className="rounded me-4"
                      style={{ width: 100, height: 100 }}
                    >
                      <img
                        src="img/featur-3.jpg"
                        className="img-fluid rounded"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 className="mb-2">Big Banana</h6>
                      <div className="d-flex mb-2">
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star text-secondary" />
                        <i className="fa fa-star" />
                      </div>
                      <div className="d-flex mb-2">
                        <h5 className="fw-bold me-2">2.99 $</h5>
                        <h5 className="text-danger text-decoration-line-through">
                          4.11 $
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center my-4">
                    <a
                      href="#"
                      className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100"
                    >
                      Vew More
                    </a>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="position-relative">
                    <img
                      src="img/banner-fruits.jpg"
                      className="img-fluid w-100 rounded"
                      alt=""
                    />
                    <div
                      className="position-absolute"
                      style={{
                        top: "50%",
                        right: 10,
                        transform: "translateY(-50%)"
                      }}
                    >
                      <h3 className="text-secondary fw-bold">
                        Fresh <br /> Fruits <br /> Banner
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row g-4 justify-content-center">      
                { products && products.map((product) => (
                   <div  key={product.id} className="col-md-6 col-lg-4 col-xl-4">
                    <div className="rounded position-relative fruite-item">
                      <div className="fruite-img fruite-img ratio ratio-4x3 overflow-hidden rounded-top">
                        <img
                          src={`${product.image}`}
                          className="img-fluid w-100 rounded-top"
                          alt=""
                        />
                      </div>
                      <div
                        className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                        style={{ top: 10, left: 10 }}
                      >
                         {product.category.name}
                      </div>
                      <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                        <h4 className="text-center">{product.name}</h4>
                        <p>
                          {product.description}
                        </p>
                        <div className="d-flex flex-column justify-content-center align-items-center flex-lg-wrap">
                          <p className="text-dark fs-5 fw-bold mb-2">
                            ${product.price} / kg
                          </p>
                          {/* dev_6_Fruit */}
                          <button
                            onClick={() => addToCart(product)}      
                            className="btn border border-secondary rounded-pill px-3 text-primary"
                          >
                            <i className="fa fa-shopping-bag me-2 text-primary" />{" "}
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                ))}                

                {/* 페이징 시작 */}
                <div className="col-12">
                  <div className="pagination d-flex justify-content-center mt-5">
                    <a href="#" className="rounded">
                      «
                    </a>
                    <a href="#" className="active rounded">
                      1
                    </a>
                    <a href="#" className="rounded">
                      2
                    </a>
                    <a href="#" className="rounded">
                      3
                    </a>
                    <a href="#" className="rounded">
                      4
                    </a>
                    <a href="#" className="rounded">
                      5
                    </a>
                    <a href="#" className="rounded">
                      6
                    </a>
                    <a href="#" className="rounded">
                      »
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Fruits Shop End*/}
  {/* Back to Top */}
  <a
    href="#"
    className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
    style={{ display: "none" }}
  >
    <i className="fa fa-arrow-up" />
  </a>
  {/* JavaScript Libraries */}
  {/* Template Javascript */}
  <div
    id="lightboxOverlay"
    tabIndex={-1}
    className="lightboxOverlay"
    style={{ display: "none" }}
  />
  <div
    id="lightbox"
    tabIndex={-1}
    className="lightbox"
    style={{ display: "none" }}
  >
    <div className="lb-outerContainer">
      <div className="lb-container">
        <img
          className="lb-image"
          src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          alt=""
        />
        <div className="lb-nav">
          <a
            className="lb-prev"
            role="button"
            tabIndex={0}
            aria-label="Previous image"
            href=""
          />
          <a
            className="lb-next"
            role="button"
            tabIndex={0}
            aria-label="Next image"
            href=""
          />
        </div>
        <div className="lb-loader">
          <a className="lb-cancel" role="button" tabIndex={0} />
        </div>
      </div>
    </div>
    <div className="lb-dataContainer">
      <div className="lb-data">
        <div className="lb-details">
          <span className="lb-caption" />
          <span className="lb-number" />
        </div>
        <div className="lb-closeContainer">
          <a className="lb-close" role="button" tabIndex={0} />
        </div>
      </div>
    </div>
  </div>
</>

  )
}

export default Shop

