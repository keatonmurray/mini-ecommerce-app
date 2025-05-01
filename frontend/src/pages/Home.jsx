import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { id: 1, title: 'Clothes', price: 50, image: '/images/women.png' },
  { id: 2, title: 'Clothes', price: 50, image: '/images/women.png' },
  { id: 3, title: 'Clothes', price: 50, image: '/images/women.png' },
  { id: 4, title: 'Clothes', price: 50, image: '/images/women.png' },
  { id: 5, title: 'Clothes', price: 50, image: '/images/women.png' }
];

const Home = () => {
  return (
    <div className="home">
      <h4 className="page-title mt-5  px-md-auto px-3">Women</h4>
      <div className="row text-center">
        {items.map((item) => (
          <div
            key={item.id}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <Link to="/product" className="text-decoration-none">
              <div className="item mt-5 w-100">
                <div className="m-0 w-100 px-md-auto px-3">
                  <img src={item.image} alt={item.title} className="img-fluid w-100" />
                  <div className="text-start mt-3">
                    <p className="product-name">
                      {item.title}
                      <span className="d-block fw-bold">${item.price}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
