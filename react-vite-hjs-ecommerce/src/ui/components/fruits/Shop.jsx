import { getCategories } from '@/api/CategoryApi'
import { usePagination } from '@/contexts/PaginationContext'
import React, { useEffect, useState } from 'react'
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

  const { products, search, setSearch, ordering, setOrdering, category, setCategory,} = usePagination();
  console.log(products)
  
  const [categories, setCategories] = useState([]);

  useEffect(() => {    
    //http://localhost:8000/api/categories/
    getCategories()
    .then(res => setCategories(res.data))
    .catch(err => console.log(err))

  }, []);


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
                      max={500}
                      defaultValue={0}
                      oninput="amount.value=rangeInput.value"
                    />
                    <output
                      id="amount"
                      name="amount"
                      min-velue={0}
                      max-value={500}
                      htmlFor="rangeInput"
                    >
                      0
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
  {/* Footer Start */}
  <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
    <div className="container py-5">
      <div
        className="pb-4 mb-4"
        style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
      >
        <div className="row g-4">
          <div className="col-lg-3">
            <Link href="#">
              <h1 className="text-primary mb-0">Fruitables</h1>
              <p className="text-secondary mb-0">Fresh products</p>
            </Link>
          </div>
          <div className="col-lg-6">
            <div className="position-relative mx-auto">
              <input
                className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                type="number"
                placeholder="Your Email"
              />
              <button
                type="submit"
                className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                style={{ top: 0, right: 0 }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-end pt-3">
              <a
                className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle"
                href=""
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                href=""
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                href=""
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                className="btn btn-outline-secondary btn-md-square rounded-circle"
                href=""
              >
                <i className="fab fa-linkedin-in" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Why People Like us!</h4>
            <p className="mb-4">
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the like Aldus PageMaker including of Lorem
              Ipsum.
            </p>
            <a
              href=""
              className="btn border-secondary py-2 px-4 rounded-pill text-primary"
            >
              Read More
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Shop Info</h4>
            <a className="btn-link" href="">
              About Us
            </a>
            <a className="btn-link" href="">
              Contact Us
            </a>
            <a className="btn-link" href="">
              Privacy Policy
            </a>
            <a className="btn-link" href="">
              Terms &amp; Condition
            </a>
            <a className="btn-link" href="">
              Return Policy
            </a>
            <a className="btn-link" href="">
              FAQs &amp; Help
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Account</h4>
            <a className="btn-link" href="">
              My Account
            </a>
            <a className="btn-link" href="">
              Shop details
            </a>
            <a className="btn-link" href="">
              Shopping Cart
            </a>
            <a className="btn-link" href="">
              Wishlist
            </a>
            <a className="btn-link" href="">
              Order History
            </a>
            <a className="btn-link" href="">
              International Orders
            </a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Contact</h4>
            <p>Address: 1429 Netus Rd, NY 48247</p>
            <p>Email: Example@gmail.com</p>
            <p>Phone: +0123 4567 8910</p>
            <p>Payment Accepted</p>
            <img src="img/payment.png" className="img-fluid" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light">
            <a href="#">
              <i className="fas fa-copyright text-light me-2" />
              Your Site Name
            </a>
            , All right reserved.
          </span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
          {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
          {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
          {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
          Designed By{" "}
          <a className="border-bottom" href="https://htmlcodex.com">
            HTML Codex
          </a>{" "}
          Distributed By{" "}
          <a className="border-bottom" href="https://themewagon.com">
            ThemeWagon
          </a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
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

