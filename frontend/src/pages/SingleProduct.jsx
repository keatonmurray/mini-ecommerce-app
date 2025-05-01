import React from 'react'
import { useState } from 'react'

const SingleProduct = () => {

  const [isSizeSelected, setIsSizeSelected] = useState('XS');
  const [isColorSelected, setIsColorSelected] = useState('lavender');

  const sizeSelected = (size) => {
    setIsSizeSelected(size);
  }

  const colorSelected = (color) => {
    setIsColorSelected(color);
  }

  const thumbnails = [
    "/images/men.png",
    "/images/men.png",
    "/images/men.png",
    "/images/men.png",
    "/images/men.png"
  ];

  return (
    <div className="single-product mt-5 px-md-auto px-3">
      <div className="row">
        {/* Product Gallery */}
        <div className="col-12 col-md-1 d-md-block d-none" data-testid="product-gallery">
          <div className="row">
            {thumbnails.map((src, index) => (
              <div className="col-3 col-md-12 mb-3" key={index}>
                <img src={src} alt={`Thumbnail ${index + 1}`} height="75" width="75" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Product Preview */}
        <div className="col-12 col-md-6 d-flex">
          <div className="product-full-preview w-100">
            <img
              src="/images/men.png"
              alt="Men"
              className="img-fluid w-100 h-100 object-fit-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-md-5 justify-content-center align-items-start">
          <h4 className="fw-bold mt-md-0 mt-4 text-md-start text-center">Running Shorts</h4>

          {/* Product Attributes */}
          <div className="attributes text-md-start text-center">
            <p className="fw-bold text-uppercase mt-4">Size:</p>
            <div
              className="sizes d-flex justify-content-md-start justify-content-center gap-2"
              data-testid="product-attribute-size"
            >
              {['XS', 'S', 'M', 'L'].map((size) => (
                <div
                  key={size}
                  className={`size ${isSizeSelected === size ? 'size-active-selected' : ''}`}
                  onClick={() => sizeSelected(size)}
                >
                  {size}
                </div>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Color:</p>
            <div
              className="colors d-flex justify-content-md-start justify-content-center gap-2"
              data-testid="product-attribute-color"
            >
              {['lavender', 'black', 'green'].map((color) => (
                <div
                  key={color}
                  className={`color color-${color} ${isColorSelected === color ? 'color-active-selected' : ''}`}
                  onClick={() => colorSelected(color)}
                />
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Price:</p>
            <h6 className="price fw-bold">$50</h6>
          </div>

          {/* Add to Cart Button */}
          <button
            className="mt-4 btn btn-custom-primary text-uppercase w-md-75 w-100 py-2"
            data-testid="add-to-cart"
          >
            Add to Cart
          </button>

          {/* Product Description */}
          <p className="mt-4 w-md-75 w-100" data-testid="product-description">
            Find women's stunning cocktail dresses. Standout in lace and metallic cocktail dresses and party dresses from all your favourite brands.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
