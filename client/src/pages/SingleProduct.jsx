import React, { useState, useEffect } from 'react';
import Size from '../components/partials/Size';
import Color from '../components/partials/Color';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [isSizeSelected, setIsSizeSelected] = useState('XS');
  const [isColorSelected, setIsColorSelected] = useState('lavender');

  const { id } = useParams();  

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

  const fetchProduct = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          {
            singleProduct(product_id: "${id}") {
              product_name
              attribute_name
              gallery
              value
              amount
              description
              currency {
                label
                symbol
              }
            }
          }
        `
      });
      setProduct(response.data.data.singleProduct[0]); 
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-product mt-5 px-lg-auto px-3 pb-lg-5 pb-3">
      <div className="row gy-4">
        <div className="col-12 col-lg-8 product-container">
          <div
            className="col-12 col-lg-2 d-none d-lg-block me-3 thumbnail-container"
            data-testid="product-gallery"
          >
            <div className="row">
              {thumbnails.map((src, index) => (
                <div key={index}>
                  <img
                    src={product.gallery[0]}
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
              src={product.gallery[0]}
              alt="Men"
              className="img-fluid w-100 object-fit-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-lg-4 d-flex flex-column align-items-lg-start align-items-center">
          <h4 className="fw-bold mt-lg-0 mt-4 text-lg-start text-center">
            {product.product_name}
          </h4>

          <div className="attributes text-lg-start text-center w-100">
            <p className="fw-bold text-uppercase mt-4">{product.attribute_name}</p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {[product.value].map((product) => (
                <Size
                  key={product}  
                  className={`size ${isSizeSelected === product ? 'size-active-selected' : ''}`}
                  onClick={() => sizeSelected(size)}
                >
                  {product}
                </Size>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Color:</p>
            <div
              className="colors d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-color"
            >
              {['lavender', 'black', 'green'].map((color) => (
                <Color  
                  key={color}
                  className={`color color-${color} ${
                    isColorSelected === color ? 'color-active-selected' : ''
                  }`}
                  onClick={() => colorSelected(color)}
                />
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Price:</p>
            <h6 className="price fw-bold">
              {product.currency?.symbol}{product.amount}
            </h6>
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
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
