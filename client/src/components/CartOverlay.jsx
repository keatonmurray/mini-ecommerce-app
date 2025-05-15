import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_ORDERS = gql`
  {
    orders {
      order_details {
        id
        name
        quantity
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
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart</p>;

  const orderDetails = data?.orders?.flatMap(order => order.order_details) || [];

  const totalAmount = orderDetails.reduce((acc, item) => {
    const price = item.prices[0]?.amount || 0; 
    return acc + price * item.quantity;
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
          <div className="row align-items-start mb-3" key={item.id}>
            <div className="col-9">
              <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
                <p className="product-name mb-0 me-2">{item.name}</p>
                <div className="cart-action d-flex flex-column align-items-center mt-2 mt-md-0">
                  <button className="plus">+</button>
                  <button className="minus mt-2">-</button>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <p className="product-price">
                  {currencySymbol}
                  {(item.prices[0]?.amount || 0).toFixed(2)}
                </p>
                <p className="product-quantity">Qty: {item.quantity}</p>
              </div>
            </div>

            <div className="col-3 text-end cart-overlay-product-preview-container">
              <img
                // src={item.gallery?.[0]}
                alt={item.name}
                className="img-fluid"
              />
            </div>

            <input type="hidden" name="quantity" value={item.quantity} />
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
          <button className="btn btn-custom-primary w-100">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
