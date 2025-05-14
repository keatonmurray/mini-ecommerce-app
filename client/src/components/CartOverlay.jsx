import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/partials/Form'

const CartOverlay = () => {
  const [orders, setOrders] = useState([]);
  const [quantities, setQuantities] = useState({});

  const getOrder = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: `
          query {
            orders {
              products_id
              quantity
              total
              name
              gallery
              amount
            }
          }
        `
      });

      setOrders(response.data.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      const initialQuantities = {};
      orders.forEach(order => {
        initialQuantities[order.products_id] = order.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [orders]);

  const updateCart = async (e) => {
    e.preventDefault();

    const mutationParts = Object.entries(quantities).map(([productId, quantity], index) => {
      return `
        q${index}: cart_quantity(
          quantity: ${quantity}
          products_id: "${productId}"
        )
      `;
    });

    const mutation = `
      mutation {
        ${mutationParts.join('\n')}
      }
    `;

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: mutation,
      });
      getOrder(); 
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const addQuantity = (productId) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantities((prev) => {
      const updatedQuantities = { ...prev };
      if (updatedQuantities[productId] > 0) {
        updatedQuantities[productId] -= 1;
      }
      return updatedQuantities;
    });
  };

  return (
    <div className="position-relative px-3">
      <div className="cart-overlay-container position-absolute end-0 shadow-lg p-4 bg-white">
        <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">{orders.length} items</span>
        </h6>

        <Form onSubmit={updateCart} method="POST">
          {orders.map((item, index) => (
            <div key={index} className="row align-items-start">
              <div className="col-9">
                <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
                  <p className="product-name mb-0 me-2">{item.name}</p>
                  <div className="cart-action d-flex flex-column align-items-center mt-2 mt-md-0">
                    <button onClick={() => addQuantity(item.products_id)} className="plus">+</button>
                    <button onClick={() => decreaseQuantity(item.products_id)} className="minus mt-2">-</button>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                  <p className="product-price">${item.amount}</p>
                  <p>{quantities[item.products_id] || 0}</p>
                </div>
              </div>
              <div className="col-3 text-end cart-overlay-product-preview-container">
                <img
                  src={item.gallery[0]}
                  alt={item.name}
                  className="img-fluid"
                />
              </div>
              <input
                type="hidden"
                name="quantity"
                value={quantities[item.products_id] || ''}
              />
            </div>
          ))}
          <div className="total-price d-flex justify-content-between">
            <h6>Total</h6>
            <h6 className="fw-bold">$100</h6>
          </div>

           <div className="mt-1">
            <button className="btn btn-custom-primary w-100">Place Order</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CartOverlay