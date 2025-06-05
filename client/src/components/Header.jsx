import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CART_ORDERS_QUERY } from '../graphql/queries/orders';
import { PRODUCT_CATEGORIES } from '../graphql/queries/categories';
import axios from 'axios';

const Header = ({ activeCategory, setActiveCategory, setHandleCartOverlay, setIsCartExpanded}) => {
  const [isCategory, setIsCategory] = useState();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [ordersData, setOrdersData] = useState(null);
  const location = useLocation();
  const [isHomepage, setIsHomepage] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL, {
          query: CART_ORDERS_QUERY
        });
        setOrdersData(response.data.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalQuantityCount = () => {
    if(totalQuantity !== 0) {
      return totalQuantity
    }
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setIsCartExpanded(false);

    if (category.toLowerCase() === 'all') {
      setIsHomepage(true);
    } else {
      setIsHomepage(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: PRODUCT_CATEGORIES()
      });
      setIsCategory(response.data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const total = ordersData?.orders
      ?.flatMap(order => order.order_details)
      .reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
    
    setTotalQuantity(total);
  }, [ordersData]);

  const hideCartOverlay = () => {
    setIsCartExpanded(false)
  }

  return (
    <div className="cart-overlay px-5">
      <div className="header d-flex flex-wrap flex-md-row align-items-center justify-content-between py-3 py-md-4 mb-3">
        <div className="category mb-3 mb-md-0 w-md-50-custom">
          <ul className="d-flex flex-row align-items-center m-0 p-0">
            {[...new Set(isCategory?.map(item => item.category_name))].map((category) => {
              const isAll = category.toLowerCase() === 'all';
              return (
                <li
                  key={category}
                  className={`list-unstyled text-uppercase mx-2 px-2 ${activeCategory === category ? 'active-category' : ''}`}
                >
                  <Link
                    to={isAll ? '/all' : `/${category.toLowerCase()}`}
                    onClick={() => handleCategoryClick(category)}
                    className="text-decoration-none text-reset"
                    data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
                  >
                    {category}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="d-flex flex-nowrap justify-content-between align-items-center gap-2 w-md-50-custom mb-md-0 mb-3">
          <div className="icons">
            <Link to="/" onClick={hideCartOverlay}>
              <i className="bi bi-bag-heart-fill"></i>
            </Link>
          </div>
          <div className="icons me-md-4 me-0 position-relative">
            <i
              className="bi bi-cart fs-4"
              onClick={() => setHandleCartOverlay()}
              data-testid='cart-btn'
            ></i>
            <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {totalQuantityCount()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
