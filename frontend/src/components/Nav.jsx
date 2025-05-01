import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartOverlay from './CartOverlay';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState('Women'); 
  const [isCartExpanded, setIsCartExpanded] = useState(false);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCartOverlay = () => {
    setIsCartExpanded(true)
  }

  return (
    <div className="cart-overlay">
        <div className="header d-flex flex-wrap flex-md-row align-items-center justify-content-between py-3 py-md-4 mb-3">
            <div className="category mb-3 mb-md-0 w-md-50-custom">
                <ul className="d-flex flex-row align-items-center m-0 p-0">
                {['Women', 'Men', 'Kids'].map((category) => (
                    <li
                    key={category}
                    className={`list-unstyled text-uppercase mx-2 px-2 ${activeCategory === category ? 'active-category' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                    data-testid={activeCategory === category ? 'active-category-link' : 'category-link'}
                    >
                    {category}
                    </li>
                ))}
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
