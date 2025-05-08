import React, { useState, useEffect } from 'react';
import Size from '../components/partials/Size';
import Color from '../components/partials/Color';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [attributes, setAttribute] = useState();
  const [isSizeSelected, setIsSizeSelected] = useState();
  const [isColorSelected, setIsColorSelected] = useState();

  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
        {
          attributes(product_id: "${id}")
          {
            attribute_name
            attribute_value
            attribute_display_value
            product_slug
            gallery
            amount
            product_name
            description
            currency {
                  label
                  symbol 
              }
          }
        }`
      });
      setAttribute(response.data.data.attributes);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!attributes) {
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
              {attributes[0]?.gallery.map((src, index) => (
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

          <div className="product-full-preview w-100">
            <img
              src={attributes[0]?.gallery[0]}
              alt="Men"
              className="img-fluid w-100 object-fit-cover"
            />
          </div>
        </div>

        <div className="col-12 col-lg-4 d-flex flex-column align-items-lg-start align-items-center">
          <h4 className="fw-bold mt-lg-0 mt-4 text-lg-start text-center">
            {attributes[0]?.product_name}
          </h4>

          <div className="attributes text-lg-start text-center w-100">
            <p className="fw-bold text-uppercase mt-4">{attributes[0]?.attribute_name}</p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
             {attributes.map((attr) => (
                <Size
                  key={attr.attribute_value}
                  className={`size ${isSizeSelected === attr.attribute_value ? 'size-active-selected' : ''}`}
                  onClick={() => setIsSizeSelected(attr.attribute_value)}
                >
                  {attr.attribute_display_value}
                </Size>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">Color:</p>
            <div
              className="colors d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-color"
            >

            {attributes.map((attr) => {
              const product = attr.attribute_value; 
              return (
                <Color
                  key={product}
                  className={`color color-${product} ${isColorSelected === product ? 'color-active-selected' : ''}`}
                  onClick={() => setIsColorSelected(product)}
                />
              );
            })}
            </div>

            <p className="fw-bold text-uppercase mt-4">Price:</p>
            <h6 className="price fw-bold">
              {attributes[0]?.currency?.symbol}{attributes[0]?.amount} {attributes[0]?.currency?.label}
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
            dangerouslySetInnerHTML={{ __html: attributes[0]?.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
