import React, { useEffect, useState } from 'react';
import { Link, useParams, useOutletContext, useLocation } from 'react-router-dom';
import Form from '../components/partials/Form'
import axios from 'axios';

const Home = () => {

  const {id} = useParams()
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [data, setData] = useState({
    product: [],
    category: []
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          query {
            products {
              slug
              name
              gallery
              amount
              currency {
                label
                symbol
              }
            }
            category(product_id: "${id}") {
              product_name
              product_id
              category_name
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
      setData({
        product: response.data.data.products,
        category: response.data.data.category
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, [id]);

  const addToCart = async(e) => {
    e.preventDefault();

    const mutation = `
      //mutation
    `

    const formValues = {

    }

    try {
      response = await axios.post(import.meta.env.VITE_API_URL, {
        query: mutation,
        variables: variables
      })
    } catch (error) {
      console.error(error)
    }

  }

  const { product, category } = data;

  return (
    <div className="home">
      <h4 className="page-title mt-4 px-md-auto px-3">Products</h4>
      <div className="row text-center">
        
      {isHomePage ? (
        product.map((item, index) => (
          <div
            key={index}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <div className="text-decoration-none w-100">
              <Form onSubmit={addToCart} method="POST">
                  <div className="item mt-4 w-100">
                    <div className="img-overlay-hover position-relative m-0 w-100 px-md-auto py-2 px-3">
                      <Link to={`product/${item.slug}`}>
                        <img
                          src={item.gallery[0]}
                          alt={item.name}
                          className="img-fluid w-100"
                        />
                      </Link>
                      <div className="text-start my-1">
                        <p className="product-name m-0">
                          {item.name}
                          <span className="d-block fw-bold">
                            {item.currency?.symbol} {item.amount}
                          </span>
                        </p>
                      </div>
                      <button type="submit" className="btn btn-success add-to-cart-btn-overlay">
                        <i className="bi bi-cart"></i>
                      </button>
                    </div>
                  </div>
              </Form>
            </div>
          </div>
        ))
      ) : (
        category.map((item, index) => (
          <div
            key={index}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <div className="text-decoration-none w-100">
              <div className="item mt-4 w-100">
                <div className="img-overlay-hover position-relative m-0 w-100 px-md-auto py-2 px-3">
                  <Link to={`/product/${item.product_id}`}> 
                    <img
                      src={item.gallery[0]}
                      alt={item.product_name}
                      className="img-fluid w-100"
                    />
                  </Link>
                 <div className="text-start mt-3">
                    <p className="product-name m-0">
                      {item.product_name}
                      <span className="d-block fw-bold">
                        {item.currency?.symbol} {item.amount}
                      </span>
                    </p>
                  </div>
                  <input type="hidden" name="productId" value={item.id} />
                  <input type="hidden" name="name" value={item.name} />
                  <input type="hidden" name="amount" value={item.amount} />
                  <input type="hidden" name="currency" value={item.currency?.symbol} />
                  <button type="button" className="btn btn-success add-to-cart-btn-overlay">
                    <i className="bi bi-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
};

export default Home;
