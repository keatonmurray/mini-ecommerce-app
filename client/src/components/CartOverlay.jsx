import React from 'react'
import Attribute from './partials/Attribute'
import { useState, useEffect } from 'react';
import axios from 'axios';

const CartOverlay = () => {
  const [isSizeSelected, setIsSizeSelected] = useState('XS');
  const [isColorSelected, setIsColorSelected] = useState('lavender');
  const [orders, setOrders] = useState([]);

  const sizeSelected = (size) => setIsSizeSelected(size);
  const colorSelected = (color) => setIsColorSelected(color);

  const getOrder = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          query {
            orders {
              products_id
              quantity
              total
              name
              gallery
            }
          }
        `
      });

      setOrders(response.data.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div className="position-relative px-3">
      <div className="cart-overlay-container position-absolute end-0 shadow-lg p-4 bg-white">
        <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">{orders.length} items</span>
        </h6>

        {orders.map((item, index) => (
          <div key={index} className="row align-items-start">
            <div className="col-6">
              <div className="d-flex">
                <p className="product-name mb-0">{item.name}</p>
                <div className="cart-action ms-4">
                  <button className="plus">+</button>
                </div>
              </div>
              <h6 className="price fw-bold">${item.total}</h6>
              <p className="fw-bold text-small">Size:</p>
              <div className="d-flex gap-1 sizes flex-wrap">
                {['XS', 'S', 'M', 'L'].map((size) => (
                  <Attribute
                    key={size}
                    className={`size ${isSizeSelected === size ? 'size-active-selected' : ''}`}
                    onClick={() => sizeSelected(size)}
                  >
                    {size}
                  </Attribute>
                ))}
              </div>
              <p className="fw-bold text-small mt-3">Color:</p>

              <div className="d-flex gap-2">
                {['lavender', 'black', 'white'].map((color) => (
                  <Attribute
                    key={color}
                    className={`color-box ${isColorSelected === color ? 'active-color' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => colorSelected(color)}
                  />
                ))}
              </div>
            </div>
            <div className="col-6 text-end cart-overlay-product-preview-container">
              <img
                src={item.gallery[0]}
                alt={item.name}
                className="img-fluid"
              />
            </div>
            <div className="d-flex justify-content-between mt-5">
              <p className="fw-bold">Total:</p>
              <p className="fw-bold">${item.total}</p>
            </div>
          </div>
        ))}

        <div className="mt-1">
          <button className="btn btn-custom-primary w-100">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay