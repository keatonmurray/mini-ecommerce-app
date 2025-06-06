import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS_QUERY } from '../graphql/queries/products';
import { ATTRIBUTES_QUERY } from '../graphql/queries/attributes';
import { CART } from '../graphql/mutations/cart';
import { toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const { id } = useParams();
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/all';
  const { isCartExpanded, setIsCartExpanded } = useOutletContext();

  const [data, setData] = useState({
    product: [],
    category: [],
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: PRODUCTS_QUERY(id),
      });
      setData({
        product: response.data.data.products,
        category: response.data.data.category,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error("Error fetching products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const { product, category } = data;

  const fetchAttributes = async (slug) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: ATTRIBUTES_QUERY(slug),
      });

      const data = response.data.data;

      return {
        attributes: data.attributes,
        size: data.size,
        color: data.color,
        capacity: data.capacity,
        usb: data.usb,
        keyboard: data.keyboard,
        isSizeSelected: data.size?.[0]?.value || '',
        isColorSelected: data.color?.[0]?.value || '',
        isCapacitySelected: data.capacity?.[0]?.value || '',
        isKeyboardSelected: data.keyboard?.[0]?.value || '',
        isUsbSelected: data.usb?.[0]?.value || '',
      };
    } catch (error) {
      console.error("Error fetching attributes:", error);
      toast.error("Error fetching product attributes.");
      return null;
    }
  };

  const addToCart = async (e, item, attributesData) => {
    e.preventDefault();
    if (!attributesData) {
      toast.error("Cannot add to cart: missing attributes.");
      return;
    }

    const mutation = CART({
      size: attributesData.size,
      color: attributesData.color,
      capacity: attributesData.capacity,
      keyboard: attributesData.keyboard,
      usb: attributesData.usb,
      attributes: attributesData.attributes,
      isSizeSelected: attributesData.isSizeSelected,
      isColorSelected: attributesData.isColorSelected,
      isCapacitySelected: attributesData.isCapacitySelected,
      isKeyboardSelected: attributesData.isKeyboardSelected,
      isUsbSelected: attributesData.isUsbSelected,
      id: id,
    });

    try {
      await axios.post(import.meta.env.VITE_API_URL, { query: mutation });
      toast.success("Item was added to your cart!");
      setIsCartExpanded(true)
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("There was an error adding the item.");
    }
  };
  return (
    <div className="home">
      <h4 className="page-title mt-4 px-md-auto px-3">Products</h4>
      <div className="row text-center">
        {(isHomePage ? product : category || []).map((item, index) => {
          const name = isHomePage ? item.name : item.product_name;
          const slug = isHomePage ? item.slug : item.slug || item.product_id;
          const image = item.gallery?.[0] || '';
          const currency = item.currency?.symbol || '';
          const amount = item.amount;
          const isInStock = item.in_stock === 1;
          const kebabName = name.toLowerCase().replace(/\s+/g, '-');

          return (
            <div
              key={index}
              className={`col-12 col-md-4 d-flex align-items-center justify-content-center ${!isInStock ? 'opacity-50' : ''}`}
              data-testid={`product-${kebabName}`}
            >
              <div className="text-decoration-none w-100">
                <div className="item mt-4 w-100">
                  <div className="img-overlay-hover position-relative m-0 w-100 px-md-auto py-2 px-3">
                    <Link to={`/product/${slug}`} className="text-decoration-none">
                      {image ? (
                        <img src={image} alt={name} className="img-fluid w-100" />
                      ) : (
                        <div className="no-image-placeholder">No Image</div>
                      )}
                    </Link>

                    {!isInStock && (
                      <div className="out-of-stock-overlay d-flex justify-content-center align-items-center">
                        <span>Out of Stock</span>
                      </div>
                    )}

                    <div className={`text-start ${isHomePage ? 'my-1' : 'mt-3'}`}>
                      <p className="product-name m-0">
                        {name}
                        <span className="d-block fw-bold">
                          {currency} {amount}
                        </span>
                      </p>
                    </div>

                    {isInStock && (
                      <button
                        type="button"
                        className="btn btn-success add-to-cart-btn-overlay"
                        onClick={async (e) => {
                          e.preventDefault();
                          const attributesData = await fetchAttributes(slug);
                          await addToCart(e, item, attributesData);
                        }}
                        disabled={!isInStock}
                        title={isInStock ? 'Add to Cart' : 'Out of Stock'}
                      >
                        <i className="bi bi-cart"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
