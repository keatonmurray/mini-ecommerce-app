import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartOverlay from './CartOverlay';
import axios from 'axios';

const Header = ({ activeCategory, setActiveCategory }) => {

  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [isCategory, setIsCategory] = useState();

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCartOverlay = () => {
    setIsCartExpanded(true)
  }

  const fetchCategories = async() => {
    try {
        const query = `
          query {
            categories {
                product_id
                category_name
            }
          }
        `;
        const response = await axios.post(import.meta.env.VITE_API_URL, {
            query
        });
        setIsCategory(response.data.data.categories)
    } catch (error) {
        console.error('Error fetching products:', error);
      }
  }

useEffect(() => {
    fetchCategories();
}, []);

  return (
    <div className="cart-overlay">
        <div className="header d-flex flex-wrap flex-md-row align-items-center justify-content-between py-3 py-md-4 mb-3">
            <div className="category mb-3 mb-md-0 w-md-50-custom">
                <ul className="d-flex flex-row align-items-center m-0 p-0">
                {[...new Set(isCategory?.map(item => item.category_name))].map((category) => {
                    const isAll = category.toLowerCase() === 'all';
                    return (
                        <li
                        key={category}
                        className={`list-unstyled text-uppercase mx-2 px-2 ${activeCategory === category ? 'active-category' : ''}`}
                        data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
                        >
                        <Link
                            to={isAll ? '/' : `/category/${category.toLowerCase()}`}
                            onClick={() => handleCategoryClick(category)}
                            className="text-decoration-none text-reset"
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
                    <Link to="/">
                        <i className="bi bi-bag-heart-fill"></i>
                    </Link>
                </div>
                <div className="icons me-md-4 me-0 position-relative">
                    <i className="bi bi-cart fs-4" onClick={handleCartOverlay}></i>
                    <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                        3
                    </span>
                </div>
            </div>
        </div>
        {isCartExpanded && (
            <CartOverlay/>
        )}
    </div>
  );
};

export default Header;
