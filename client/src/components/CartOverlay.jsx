import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CartOverlay = () => {

  return (
    <div className="position-relative px-3">
      <div className="cart-overlay-container position-absolute end-0 shadow-lg p-4 bg-white">
        <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">0 items</span>
        </h6>

            <div className="row align-items-start">
              <div className="col-9">
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
                  <p className="product-name mb-0 me-2">Test</p>
                  <div className="cart-action d-flex flex-column align-items-center mt-2 mt-md-0">
                    <button className="plus">+</button>
                    <button className="minus mt-2">-</button>
                  </div>
                </div>
              
                <div className="d-flex justify-content-between mt-2">
                  <p className="product-price">$0</p>
                  <p></p>
                </div>
              </div>
              <div className="col-3 text-end cart-overlay-product-preview-container">
                <img
                  // src={item.gallery[0]}
                  // alt={item.name}
                  className="img-fluid"
                />
              </div>
              <input
                type="hidden"
                name="quantity"
                value="none"
              />
            </div>
          <div className="total-price d-flex justify-content-between">
            <h6>Total</h6>
            <h6 className="fw-bold">$100</h6>
          </div>

           <div className="mt-1">
            <button className="btn btn-custom-primary w-100">Place Order</button>
          </div>
      </div>
    </div>
  );
};

export default CartOverlay