import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CART_ORDERS_QUERY = `
  query {
    orders {
      order_details {
        primary_id
        id
        name
        quantity
        photo
        attrs {
          id
          name
          type
          items {
            id
            value
            selected
            display_value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

const CartOverlay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.post(import.meta.env.VITE_API_URL, {
          query: CART_ORDERS_QUERY
        });
        if (response.data.errors) {
          setError(response.data.errors);
          setData(null);
        } else {
          setData(response.data.data);
          setError(null);
        }
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const orderDetails = data?.orders?.flatMap(order => order.order_details || []) || [];

  useEffect(() => {
    if (!loading && data) {
      const initialQuantities = {};
      orderDetails.forEach(item => {
        initialQuantities[item.id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [loading, data]);

  useEffect(() => {
    setIsButtonEnabled(orderDetails.length !== 0);
  }, [orderDetails]);

  const handleIncrease = (id) => {
    setQuantities(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleDecrease = (id) => {
    setQuantities(prev => {
      const newQty = (prev[id] || 1) - 1;
      if (newQty <= 0) {
        return prev;
      }
      return {
        ...prev,
        [id]: newQty,
      };
    });
  };

  const removeItem = async (id) => {
    const deleteMutation = `
      mutation {
        deleteOrderDetail(id: "${id}") {
          success
        }
      }
    `;
    try {
      await axios.post(import.meta.env.VITE_API_URL, {
        query: deleteMutation
      });
      setData(prevData => {
        if (!prevData) return prevData;
        const newOrders = prevData.orders.map(order => ({
          ...order,
          order_details: order.order_details.filter(item => item.id !== id)
        }));
        return { ...prevData, orders: newOrders };
      });
      setQuantities(prev => {
        const newQuantities = { ...prev };
        delete newQuantities[id];
        return newQuantities;
      });
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  const totalAmount = orderDetails.reduce((acc, item) => {
    const price = item.prices[0]?.amount || 0;
    const quantity = quantities[item.primary_id] || item.quantity;
    return acc + price * quantity;
  }, 0);

  const currencySymbol = orderDetails[0]?.prices[0]?.currency.symbol || '$';

  return (
    <div className="position-relative px-3">
      <div className="cart-overlay-container position-absolute end-0 shadow-lg p-4 bg-white">
        <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">{orderDetails.length} item{orderDetails.length !== 1 && 's'}</span>
        </h6>

       {orderDetails.map(item => (
          <div className="row align-items-start mb-3" key={item.primary_id}>
            <div className="col-9">
              <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
                <p className="product-name mb-0 me-2">{item.name}</p>
                <div className="cart-action d-flex flex-column align-items-center mt-2 mt-md-0">
                  <button
                    className="plus btn btn-sm btn-outline-secondary"
                    onClick={() => handleIncrease(item.primary_id)}
                  >
                    +
                  </button>
                  <button
                    className="minus btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => handleDecrease(item.primary_id)}
                  >
                    -
                  </button>
                </div>
              </div>

              <div className="attributes my-2 gap-2">
                {item.attrs.map(attr => (
                  <div key={attr.id} className="attribute-group">
                    <p className="mb-1 fw-semibold mt-3">{attr.name}:</p>
                    <div className="d-flex gap-1 flex-wrap">
                      {attr.items.map(attrItem => {
                        const isSelected = attrItem.selected;
                        if (attr.type === 'swatch') {
                          return (
                            <div
                              key={attrItem.id}
                              title={attrItem.display_value}
                              style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: attrItem.value,
                                border: isSelected ? '2px solid black' : '1px solid #ccc',
                                borderRadius: '0',
                                cursor: 'default',
                              }}
                            />
                          );
                        } else {
                          return (
                            <span
                              key={attrItem.id}
                              className={`badge text-wrap ${
                                isSelected ? 'bg-dark text-white' : 'bg-light text-muted'
                              }`}
                              style={{ 
                                cursor: 'default', 
                                minWidth: '40px', 
                                textAlign: 'center', 
                                padding:'10px',
                                border: '1px solid #000' 
                              }}
                            >
                              {attrItem.display_value}
                            </span>
                          );
                        }
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mt-3">
                <p className="product-price">
                  {currencySymbol}
                  {(item.prices[0]?.amount || 0).toFixed(2)}
                </p>
                <p className="product-quantity text-end">
                  Qty: {quantities[item.primary_id] || item.quantity}
                </p>
              </div>
            </div>

            <div className="col-3 text-end cart-overlay-product-preview-container">
              <img src={item.photo} alt={item.name} className="img-fluid" />
            </div>

            <input
              type="hidden"
              name="quantity"
              value={quantities[item.primary_id] || item.quantity}
            />
          </div>
        ))}

        <div className="total-price d-flex justify-content-between">
          <h6>Total</h6>
          <h6 className="fw-bold">
            {currencySymbol}
            {totalAmount.toFixed(2)}
          </h6>
        </div>

        <div className="mt-1">
          <button
            className="btn btn-custom-primary w-100"
            disabled={!isButtonEnabled}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
