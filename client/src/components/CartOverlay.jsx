import React from 'react'
import Attribute from './partials/Attribute'
import { useState } from 'react';

const CartOverlay = () => {
    const [isSizeSelected, setIsSizeSelected] = useState('XS');
    const [isColorSelected, setIsColorSelected] = useState('lavender');
    
    const sizeSelected = (size) => {
      setIsSizeSelected(size);
    }
    const colorSelected = (color) => {
      setIsColorSelected(color);
    }

  return (
    <div className="position-relative px-3">
      <div
          className="cart-overlay-container position-absolute end-0 shadow-lg p-4 bg-white"
      >
      <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">3 items</span>
      </h6>
      <div className="row align-items-start">
          <div className="col-6">
              <div className="d-flex">
                  <p className="product-name mb-0">Clothes</p>
                  <div className="cart-action ms-4">
                      <button className="plus">
                          +
                      </button>
                  </div>
              </div>
              <h6 className="price fw-bold">$50</h6>
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
              {/* <div className="colors d-flex gap-1">
                {['lavender', 'black', 'green'].map((color) => (
                  <Color
                    key={color}
                    className={`color color-${color} ${
                      isColorSelected === color ? 'color-active-selected' : ''
                    }`}
                    onClick={() => colorSelected(color)}
                  />
                ))}
              </div> */}
          </div>
          <div className="col-6 text-end cart-overlay-product-preview-container">
              <img
                  src="/images/women.png"
                  alt="Women"
                  className="img-fluid"
              />
          </div>
          <div className="d-flex justify-content-between mt-5">
            <p className="fw-bold">Total:</p>
            <p className="fw-bold">$50</p>
          </div>
          <div className="mt-1">
            <button className="btn btn-custom-primary w-100">Place Order</button>
          </div>
      </div>
    </div>
  </div>
  )
}

export default CartOverlay