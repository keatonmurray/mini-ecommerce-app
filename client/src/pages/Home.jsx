import React, { useEffect, useState } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import axios from 'axios';

const Home = () => {

  const { activeCategory } = useOutletContext();
  const [data, setData] = useState({
    product: [],
    clothes: []
  });

  const { id } = useParams();

  const fetchProducts = async () => {
    try {
      const query = `
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
          clothes(product_id: "huarache-x-stussy-le") {
            product_name
            product_id
            gallery
            amount
            currency {
              label
              symbol
            }
          }
        }
      `;
  
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query
      });
  
      console.log(response.data);
  
      setData({
        product: response.data.data.products,
        clothes: response.data.data.clothes || []
      });
  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const { product, clothes } = data;

  return (
    <div className="home">
      <h4 className="page-title mt-4 px-md-auto px-3">Products</h4>

      <div className="row text-center">
        {product
          .filter((item) => {
            if (activeCategory === 'All') return true;
            return item.name.toLowerCase().includes(activeCategory.toLowerCase());
          })
          .map((item, index) => (
          <div
            key={index}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <Link to={`product/${item.slug}`} className="text-decoration-none w-100">
              <div className="item mt-4 w-100">
                <div className="m-0 w-100 px-md-auto px-3">
                  <img
                    src={item.gallery[0]}
                    alt={item.name}
                    className="img-fluid w-100"
                  />
                  <div className="text-start mt-3">
                    <p className="product-name m-0">
                      {item.name}
                      <span className="d-block fw-bold">
                        {item.currency?.symbol} {item.amount}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {activeCategory === 'Clothes' && clothes.map((item, index) => (
          <div
            key={index}
            className="col-12 col-md-4 d-flex align-items-center justify-content-center"
          >
            <Link to={`product/${item.product_id}`} className="text-decoration-none w-100">
              <div className="item mt-4 w-100">
                <div className="m-0 w-100 px-md-auto px-3">
                  <img
                    src={item.gallery[0]}
                    alt={item.product_name}
                    className="img-fluid w-100"
                  />
                  <div className="text-start mt-3">
                    <p className="product-name m-0">
                      {item.product_name}
                      <span className="d-block fw-bold">
                        {item.currency?.symbol} {item.amount}
                      </span>
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
