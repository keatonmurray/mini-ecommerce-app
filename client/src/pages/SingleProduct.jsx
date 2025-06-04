import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import Attribute from '../components/partials/Attribute';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ATTRIBUTES_QUERY } from '../graphql/queries/attributes';
import { CART } from '../graphql/mutations/cart';
import parse from 'html-react-parser';

const SingleProduct = () => {
  const [data, setData] = useState();
  const [isSizeSelected, setIsSizeSelected] = useState(null);
  const [isColorSelected, setIsColorSelected] = useState(null);
  const [isCapacitySelected, setIsCapacitySelected] = useState(null);
  const [isKeyboardSelected, setIsKeyboardSelected] = useState(null);
  const [isUsbSelected, setIsUsbSelected] = useState(null);
  const [isMainGalleryImage, setIsMainGalleryImage] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const galleryScroll = useRef(null)
  const { isCartExpanded } = useOutletContext();

  const { id } = useParams();

  const attributes = data?.attributes || [];

  const gallery = attributes[0]?.gallery || [];

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? gallery.length - 1 : prevIndex - 1
    );
    setIsMainGalleryImage(null);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === gallery.length - 1 ? 0 : prevIndex + 1
    );
    setIsMainGalleryImage(null);
  };

  useEffect(() => {
    if (isCartExpanded || !galleryScroll.current) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNextImage();
      } else if (e.deltaY < 0) {
        handlePrevImage();
      }
    };

    const galleryElement = galleryScroll.current;
    window.addEventListener('keydown', handleKeyDown);
    galleryElement.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      galleryElement.removeEventListener('wheel', handleWheel);
    };
  }, [isCartExpanded, handlePrevImage, handleNextImage]);

  const fetchProduct = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: ATTRIBUTES_QUERY(id),
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

  useEffect(() => {
    const isAnyInStock = attributes.some(attr => attr.in_stock == 1);

    if (
      isAnyInStock &&
      (isSizeSelected ||
      isColorSelected ||
      isCapacitySelected ||
      isKeyboardSelected ||
      isUsbSelected)
    ) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [
    attributes,
    isSizeSelected,
    isColorSelected,
    isCapacitySelected,
    isKeyboardSelected,
    isUsbSelected,
  ]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { size, color, capacity, usb, keyboard } = data;

  const isNotInStock = attributes.some(attr => attr.in_stock !== 1);

  const cleanHtmlString = (str) => {
    if (!str) return '';
    return str
      .replace(/\\n/g, '')
      .replace(/&amp;/g, '&')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"');
  };

  const addToCart = async (e) => {
    e.preventDefault();

    const requiredSelections = [
      { options: size, selected: isSizeSelected },
      { options: color, selected: isColorSelected },
      { options: capacity, selected: isCapacitySelected },
      { options: keyboard, selected: isKeyboardSelected },
      { options: usb, selected: isUsbSelected },
    ];

    const hasMissingSelection = requiredSelections.some(
      ({ options, selected }) => options.length > 0 && !selected
    );

    if (hasMissingSelection) {
      toast.error('All variations must be filled');
      return;
    }

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
      await axios.post(import.meta.env.VITE_API_URL, {
        query: mutation,
      });
      toast.success('Item was added to your cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const viewProductImage = (src) => {
    setIsMainGalleryImage(src);
    const index = gallery.indexOf(src);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="single-product mt-5 px-lg-auto px-3 pb-lg-5 pb-3">
      <div className="row">

        {/* Thumbnails */}
        <div className="col-12 col-md-2 d-none d-md-block">          
          <div className="thumbnail-container" data-testid="product-gallery">
            {gallery.map((src, index) => (
              <div key={index}>
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className={`img-fluid thumbnail-img my-1 ${isNotInStock ? 'grayscale' : ''}`}
                  onClick={() => viewProductImage(src)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div className="col-12 col-md-6">
          <div className="full-preview position-relative d-flex justify-content-center">
            <button
              type="button"
              className="position-absolute start-0 btn btn-overlay border-0 prev-image-btn"
              onClick={handlePrevImage}
            >
              &#8592;
            </button>
            <div className="full-preview-img-container">
              <img
                ref={galleryScroll}
                src={isMainGalleryImage || gallery[currentIndex]}
                alt="Product"
                className={`img-fluid full-preview-img ${isNotInStock ? 'grayscale' : ''}`}
              />
            </div>
            {isNotInStock && (
              <div className="out-of-stock-overlay d-flex justify-content-center align-items-center">
                <span>Out of Stock</span>
              </div>
            )}
            <button
              type="button"
              className="position-absolute end-0 btn btn-overlay border-0 next-image-btn"
              onClick={handleNextImage}
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-md-4 ps-md-5 ps-0">
          <h4 className="fw-bold mt-lg-0 mt-4 text-lg-start text-center my-5">
            {attributes[0]?.product_name}
          </h4>

          <div className="attributes text-lg-start text-center w-100">
            {/* Size */}
            <p className="fw-bold text-uppercase mt-4">
              {size[0]?.attribute_name}
            </p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-size"
            >
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

            {/* Color */}
            <p className="fw-bold text-uppercase mt-4">
              {color[0]?.attribute_name}
            </p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-color"
            >
              {color.map((attr, index) => {
                const isSelected = isColorSelected === attr.value;
                return (
                  <Attribute
                    key={`color-${attr.value ?? index}`}
                    className={`${isSelected ? attr.value : ''}`}
                    onClick={() => setIsColorSelected(attr.value)}
                    style={isSelected ? { border: '2px solid #000' } : {}}
                  >
                    <div className="color" style={{ backgroundColor: attr.value }} />
                  </Attribute>
                );
              })}
            </div>

            {/* Capacity */}
            <p className="fw-bold text-uppercase mt-4">
              {capacity[0]?.attribute_name}
            </p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-capacity"
            >
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

            {/* Keyboard */}
            <p className="fw-bold text-uppercase mt-4">
              {keyboard[0]?.attribute_name}
            </p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-keyboard"
            >
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

            {/* USB */}
            <p className="fw-bold text-uppercase mt-4">
              {usb[0]?.attribute_name}
            </p>
            <div
              className="sizes d-flex justify-content-lg-start justify-content-center gap-2 flex-wrap"
              data-testid="product-attribute-usb"
            >
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
          </div>

          <div
            className="product-description mt-4 text-lg-start text-center"
            data-testid="product-description"
          >
            {parse(cleanHtmlString(attributes[0]?.description))}
          </div>

          <div className="d-flex justify-content-md-start justify-content-center">
            <button
              type="submit"
              className="btn btn-custom-primary btn-lg mt-4 px-5 rounded-0"
              data-testid="add-to-cart-btn"
              onClick={addToCart}
              disabled={!isButtonEnabled}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default SingleProduct;
