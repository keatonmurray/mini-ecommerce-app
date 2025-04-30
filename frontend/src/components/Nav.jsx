import React, { useState } from 'react';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState('Women'); 

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="header d-flex flex-wrap flex-md-row align-items-center justify-content-between px-3 py-3 px-md-4 py-md-4">
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

        <div className="d-flex justify-content-between align-items-center gap-2 w-md-50-custom">
            <div className="icons">
                <i class="bi bi-bag-heart-fill"></i>
            </div>
            <div className="icons me-4 position-relative">
                <i className="bi bi-cart fs-4"></i>
                <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    3
                </span>
            </div>
        </div>
    </div>

  );
};

export default Header;
