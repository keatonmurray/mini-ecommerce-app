import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          {
            products {
              name
              gallery
              amount
              currency {
                label
                symbol
              }
            }
          }
        `
      });

      setProducts(response.data.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="home">
      <h4 className="page-title mt-5 px-md-auto px-3">Products</h4>
      <div className="row text-center">
        {products.map((product, index) => (
          <div
            key={index}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <Link to="/product" className="text-decoration-none">
              <div className="item mt-5 w-100">
                <div className="m-0 w-100 px-md-auto px-3">
                  <img src={product.gallery[0]} alt={product.name} className="img-fluid w-100" />
                  <div className="text-start mt-3">
                    <p className="product-name">
                      {product.name}
                      <span className="d-block fw-bold">{product.currency?.symbol} {product.amount}</span> {/* Placeholder price */}
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
