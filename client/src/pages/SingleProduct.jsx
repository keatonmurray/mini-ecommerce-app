import React, { useState, useEffect } from 'react';
import Attribute from '../components/partials/Attribute';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [data, setData] = useState();
  const [isAttributeSelected, setIsAttributeSelected] = useState(null);

  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          query {
            attributes(product_id: "${id}") {
              product_name
              gallery
              description
              amount
              currency {
                label
                symbol
              }
            }
            size(product_id: "${id}") {
              attribute_name
              product_id
              display_value
              value
              attribute_id
            }
            color(product_id: "${id}") {
              attribute_name
              product_id
              display_value
              attribute_id
              value
            }
            capacity(product_id: "${id}") {
              attribute_name
              product_id
              display_value
              attribute_id
              value
            }
            usb(product_id: "${id}") {
              attribute_name
              product_id
              display_value
              attribute_id
              value
            }
            keyboard(product_id: "${id}") {
              attribute_name
              product_id
              display_value
              attribute_id
              value
            }
          }`
      });
      setData({
        attributes: response.data.data.attributes,
        size: response.data.data.size,
        color: response.data.data.color,
        capacity: response.data.data.capacity,
        usb: response.data.data.usb,
        keyboard: response.data.data.keyboard
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { 
    attributes, 
    size, 
    color, 
    capacity, 
    usb,
    keyboard 
  } = data;

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
            <p className="fw-bold text-uppercase mt-4">{size[0]?.attribute_name}</p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {size.map((attr, index) => (
                <Attribute
                  key={attr.value ?? index}
                  className={`size ${isAttributeSelected === attr.value ? 'size-active-selected' : ''}`}
                  onClick={() => setIsAttributeSelected(attr.value)}
                >
                  {attr.display_value}
                </Attribute>
              ))}

            </div>
            
            <p className="fw-bold text-uppercase mt-4">{color[0]?.attribute_name}</p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {color.map((attr, index) => {
                const isSelected = isAttributeSelected === attr.value;
                return (
                  <Attribute
                    key={attr.value ?? index}
                    className={`${isSelected ? attr.value : ''}`}
                    onClick={() => setIsAttributeSelected(attr.value)}
                    style={isSelected ? { border:"2px solid #000"} : {}}
                  >
                    <div className="color" style={{ backgroundColor: attr.value }} />
                  </Attribute>
                );
              })}
            </div>

            <p className="fw-bold text-uppercase mt-4">{capacity[0]?.attribute_name}</p>

            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {capacity.map((attr, index) => (
                  <Attribute
                    key={attr.value ?? index}
                    className={`size ${isAttributeSelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsAttributeSelected(attr.value)}
                  >
                  {attr.display_value}
                </Attribute>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">{keyboard[0]?.attribute_name}</p>

            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {keyboard.map((attr, index) => (
                  <Attribute
                    key={attr.value ?? index}
                    className={`size ${isAttributeSelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsAttributeSelected(attr.value)}
                  >
                  {attr.display_value}
                </Attribute>
              ))}
            </div>

            <p className="fw-bold text-uppercase mt-4">{usb[0]?.attribute_name}</p>

            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
              {usb.map((attr, index) => (
                  <Attribute
                    key={attr.value ?? index}
                    className={`size ${isAttributeSelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsAttributeSelected(attr.value)}
                  >
                  {attr.display_value}
                </Attribute>
              ))}
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
