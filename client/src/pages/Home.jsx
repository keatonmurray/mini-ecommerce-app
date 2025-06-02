import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS_QUERY } from '../graphql/queries/products';
import { CART } from '../graphql/mutations/cart';
import { toast } from 'react-toastify';

const Home = () => {
  const { id } = useParams();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [data, setData] = useState({
    product: [],
    category: [],
  });

  const fetchProducts = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: PRODUCTS_QUERY(id)
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

  const { product, category } = data;

  const addToCart = async (e, item) => {
    e.preventDefault();

    const selectedAttributes = (item.attributes || []).map(attr => ({
      name: attr.name,
      selectedValue: attr.items?.[0]?.value || ''
    }));

    console.log(selectedAttributes)

    const mutation = CART({
      id: item.id || item.product_id,
      attributes: selectedAttributes
    });

    try {
      await axios.post(import.meta.env.VITE_API_URL, { query: mutation });
      toast.success("Item was added to your cart!");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("There was an error adding the item.");
    }
  };

  return (
    <div className="home">
      <h4 className="page-title mt-4 px-md-auto px-3">Products</h4>
      <div className="row text-center">
        {(isHomePage ? product : category).map((item, index) => {
          const name = isHomePage ? item.name : item.product_name;
          const slug = isHomePage ? item.slug : item.product_id;
          const image = item.gallery?.[0];
          const currency = item.currency?.symbol || '';
          const amount = item.amount;

          return (
            <div
              key={index}
              className="col-12 col-md-4 d-flex align-items-center justify-content-center"
            >
              <div className="text-decoration-none w-100">
                <div className="item mt-4 w-100">
                  <div className="img-overlay-hover position-relative m-0 w-100 px-md-auto py-2 px-3">
                    <Link to={`/product/${slug}`} className="text-decoration-none">
                      <img
                        src={image}
                        alt={name}
                        className="img-fluid w-100"
                      />
                    </Link>

                    <div className={`text-start ${isHomePage ? 'my-1' : 'mt-3'}`}>
                      <p className="product-name m-0">
                        {name}
                        <span className="d-block fw-bold">
                          {currency} {amount}
                        </span>
                      </p>
                    </div>

                    <button
                      type="button"
                      className="btn btn-success add-to-cart-btn-overlay"
                      onClick={(e) => addToCart(e, item)}
                    >
                      <i className="bi bi-cart"></i>
                    </button>

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
