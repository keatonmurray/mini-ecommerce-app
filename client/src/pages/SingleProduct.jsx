import React, { useState, useEffect } from 'react';
import Attribute from '../components/partials/Attribute';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Form from '../components/partials/Form';
import { toast } from 'react-toastify';
import { ATTRIBUTES_QUERY } from '../graphql/queries/attributes';
import { CART } from '../graphql/mutations/cart';

const SingleProduct = () => {
  const [data, setData] = useState();
  const [isSizeSelected, setIsSizeSelected] = useState(null);
  const [isColorSelected, setIsColorSelected] = useState(null);
  const [isCapacitySelected, setIsCapacitySelected] = useState(null);
  const [isKeyboardSelected, setIsKeyboardSelected] = useState(null);
  const [isUsbSelected, setIsUsbSelected] = useState(null)
  const [isMainGalleryImage, setIsMainGalleryImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { id } = useParams();

  const fetchProduct = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: ATTRIBUTES_QUERY(id)
      });
      setData({
        attributes: response.data.data.attributes,
        size: response.data.data.size,
        color: response.data.data.color,
        capacity: response.data.data.capacity,
        usb: response.data.data.usb,
        keyboard: response.data.data.keyboard,
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
    keyboard,
  } = data;

  const addToCart = async (e) => {
    e.preventDefault();

    const mutation = CART({
      size,
      color,
      capacity,
      keyboard,
      usb,
      attributes,
      isSizeSelected,
      isColorSelected,
      isCapacitySelected,
      isKeyboardSelected,
      isUsbSelected,
      id: id,
    });

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, { 
        query: mutation 
      })
      toast.success("Item was added to your cart!");
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const viewProductImage = (src) => {
    setIsMainGalleryImage(src);
  };

  const gallery = attributes[0]?.gallery || [];


  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
    console.log(currentIndex)
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
  };


  return (
    <div className="single-product mt-5 px-lg-auto px-3 pb-lg-5 pb-3">
      <Form onSubmit={addToCart}>
        <div className="row gy-4">
          <div className="col-12 col-lg-8 product-container">
            <div className="row d-flex align-items-center justify-content-center">
              <div
                className="col-12 col-md-3 col-lg-2 d-none d-lg-block me-3 thumbnail-container"
                data-testid="product-gallery"
              >
                  {attributes[0]?.gallery.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src}
                        alt={`Thumbnail ${index + 1}`}
                        className="img-fluid thumbnail-img my-1"
                        onClick={() => viewProductImage(src)}
                      />
                    </div>
                  ))}
              </div>
              <div className="col-12 col-md-9 product-full-preview d-flex align-items-center justify-content-center position-relative">
                <button type="button"
                  className="position-absolute start-0 top-50 translate-middle-y btn btn-overlay border-0"
                  onClick={handlePrevImage}
                  style={{ zIndex: 2 }}
                >
                  &#8592;
                </button>

                <div className="mx-5">
                  <img
                    src={isMainGalleryImage || gallery[currentIndex]}
                    alt="Product"
                    className="img-fluid w-100 object-fit-cover"
                  />
                </div>

                {/* Right Arrow */}
                <button type="button"
                  className="position-absolute end-0 top-50 translate-middle-y btn btn-overlay border-0"
                  onClick={handleNextImage}
                  style={{ zIndex: 2 }}
                >
                  &#8594;
                </button>
              </div>

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

              {/* Size */}
              {size.map((attr, index) => (
                <Attribute
                  key={`size-${attr.value ?? index}`}
                  className={`size ${isSizeSelected === attr.value ? 'size-active-selected' : ''}`}
                  onClick={() => setIsSizeSelected(attr.value)}
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

            {/* Color */}
              {color.map((attr, index) => {
                const isSelected = isColorSelected === attr.value;
                return (
                  <Attribute
                    key={`color-${attr.value ?? index}`}
                    className={`${isSelected ? attr.value : ''}`}
                    onClick={() => setIsColorSelected(attr.value)}
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

              {/* Capacity */}
              {capacity.map((attr, index) => (
                  <Attribute
                    key={`capacity-${attr.value ?? index}`}
                    className={`size ${isCapacitySelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsCapacitySelected(attr.value)}
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

            {/* Keyboard */}
              {keyboard.map((attr, index) => (
                  <Attribute
                    key={`keyboard-${attr.value ?? index}`}
                    className={`size ${isKeyboardSelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsKeyboardSelected(attr.value)}
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

            {/* Usb */}
              {usb.map((attr, index) => (
                  <Attribute
                    key={`usb-${attr.value ?? index}`}
                    className={`size ${isUsbSelected === attr.value ? 'size-active-selected' : ''}`}
                    onClick={() => setIsUsbSelected(attr.value)}
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

          <button type="submit"
            className="mt-4 btn btn-custom-primary text-uppercase w-lg-75 w-100 py-2"
            data-testid="add-to-cart"
          >
            Add to Cart
          </button>
          <p
            className="mt-4 w-lg-75 w-100 text-lg-start text-center"
            data-testid="product-description"
            dangerouslySetInnerHTML={{ __html: attributes[0]?.description }}
          ></p>

        </div>
      </div>
      </Form>
    </div>
  );
};

export default SingleProduct;
