import React, { useEffect, useState } from 'react'
import { useCart } from '../../../contexts/CartContext';
import { formatCurrency } from '../../../utils/format';
import { getCarts } from '@/api/CartApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
//dev_7_Fruit
// {
//   "cart": [
//     {
//       "product": {...},
//       "quantity": 2,
//       "price": "15000.00",
//       "total_price": "30000.00"
//     },
//     ...
//   ],
//   "cart_total_items": 5,
//   "cart_total_price": "78000.00"
// }

const Cart = () => {
  //const [cartItems, setcartItems] = useState(null);
  const {userCart,addToCart,removeFromCart } = useCart();
  const { user } = useAuth(); // ✅ 유저 상태
  const navigate = useNavigate();

  
  // 로그인 여부 확인 후 미로그인 시 리디렉션
  //[user, navigate]는
  //이 배열 안에 있는 값 중 하나라도 바뀌면, useEffect 안의 콜백 함수가 다시 실행
  //일반적으로 바뀌지는 않지만, React 팀은 안전하게 사용하려면 의존성 배열에 넣으라고 권장
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  
  const handleIncrease = (item) => {
    addToCart(item.product, 1);
  };
  
  const handleDecrease = (item) => {
    console.log(item.quantity)
    
    if (item.quantity > 1) {
      addToCart(item.product,-1);
    }else if(item.quantity == 1){
      handleRemoveItem(item.product)
    }
  };

  const handleRemoveItem = (product) => {
    console.log(product)
    console.log(product)
    removeFromCart(product.id);
    
  };

  return (
    <div>
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">Cart</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Pages</a></li>
        <li className="breadcrumb-item active text-white">Cart</li>
      </ol>
    </div>
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Products</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              {userCart && userCart.cart.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  <div className="d-flex align-items-center">
                    <img src={`http://127.0.0.1:8000/${item.product.image}`} className="img-fluid me-5 rounded-circle" style={{"width":"80px","height":"80px"}} alt />
                  </div>
                </th>
                <td>
                  <p className="mb-0 mt-4">{item.product.name}</p>
                </td>
                <td>
                  <p className="mb-0 mt-4">{Math.floor(item.price)} 원</p>
                </td>
                <td>
                  <div className="input-group quantity mt-4" style={{"width":"100px"}}>
                    <div className="input-group-btn">
                      <button  onClick={() => handleDecrease(item)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                        <i className="fa fa-minus" />
                      </button>
                    </div>
                    <input type="text" className="form-control form-control-sm text-center border-0"   value={item.quantity} />
                    <div className="input-group-btn">
                      <button   onClick={() => handleIncrease(item)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                        <i className="fa fa-plus" />
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0 mt-4">{Math.floor(item.total_price)} 원</p>
                </td>
                <td>
                  <button  onClick={() => handleRemoveItem(item.product)} className="btn btn-md rounded-circle bg-light border mt-4">
                    <i className="fa fa-times text-danger" />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="mt-5">
          <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
          <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
        </div>
        <div className="row g-4 justify-content-end">
          <div className="col-8" />
          <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
            <div className="bg-light rounded">
              <div className="p-4">
                <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                <div className="d-flex justify-content-between mb-4">
                  <h5 className="mb-0 me-4">Subtotal:</h5>
                  <p className="mb-0">$96.00</p>
                </div>
                <div className="d-flex justify-content-between">
                  <h5 className="mb-0 me-4">Shipping</h5>
                  <div className>
                    <p className="mb-0">Flat rate: $3.00</p>
                  </div>
                </div>
                <p className="mb-0 text-end">Shipping to Ukraine.</p>
              </div>
              <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                <h5 className="mb-0 ps-4 me-4">Total</h5>
                <p className="mb-0 pe-4">{userCart && formatCurrency(userCart.cart_total_price)}</p>
              </div>
              <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Cart

