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
    <div className="single-product mt-5 px-lg-auto px-3 pb-lg-5 pb-3">
      <div className="row gy-4">
        {/* Main Product Preview */}
        <div className="col-12 col-lg-8 product-container">
          {/* Thumbnail Preview - only shows on large screens and up */}
          <div
            className="col-12 col-lg-2 d-none d-lg-block me-3 thumbnail-container"
            data-testid="product-gallery"
          >
            <div className="row">
              {thumbnails.map((src, index) => (
                <div key={index}>
                  <img
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    className="img-fluid thumbnail-img"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Full Preview */}
          <div className="product-full-preview w-100">
            <img
              src="/images/men.png"
              alt="Men"
              className="img-fluid w-100 object-fit-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-lg-4 d-flex flex-column align-items-lg-start align-items-center">
          <h4 className="fw-bold mt-lg-0 mt-4 text-lg-start text-center">
            Running Shorts
          </h4>

          <div className="attributes text-lg-start text-center w-100">
            <p className="fw-bold text-uppercase mt-4">Size:</p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {['XS', 'S', 'M', 'L'].map((size) => (
                <div
                  key={size}
                  className={`size ${
                    isSizeSelected === size ? 'size-active-selected' : ''
                  }`}
                  onClick={() => sizeSelected(size)}
                >
                  {size}
                </div>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Color:</p>
            <div
              className="colors d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-color"
            >
              {['lavender', 'black', 'green'].map((color) => (
                <div
                  key={color}
                  className={`color color-${color} ${
                    isColorSelected === color ? 'color-active-selected' : ''
                  }`}
                  onClick={() => colorSelected(color)}
                />
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Price:</p>
            <h6 className="price fw-bold">$50</h6>
          </div>

          <button
            className="mt-4 btn btn-custom-primary text-uppercase w-lg-75 w-100 py-2"
            data-testid="add-to-cart"
          >
            Add to Cart
          </button>

          <p
            className="mt-4 w-lg-75 w-100 text-lg-start text-center"
            data-testid="product-description"
          >
            Find women's stunning cocktail dresses. Standout in lace and metallic
            cocktail dresses and party dresses from all your favourite brands.
          </p>
        </div>
      </div>
    </div>

  )
}

export default SingleProduct
