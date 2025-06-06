import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CART_ORDERS_QUERY } from '../graphql/queries/orders';
import { PLACE_ORDER } from '../graphql/mutations/placeOrder';
import { REMOVE_ITEM } from '../graphql/mutations/removeItem';
import { toast } from 'react-toastify';
import { UPDATE_CART_ITEM_QUANTITY } from '../graphql/mutations/updateItemQuantity';
const CartOverlay = ({ setIsCartExpanded }) => {
  const [data, setData] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [totalItemQuantity, setTotalItemQuantity] = useState(0);
  const [quantities, setQuantities] = useState(() => {
    const stored = localStorage.getItem('quantities');
    return stored ? JSON.parse(stored) : {};
  });

  // Fetch Orders in Cart Overlay
  const fetchOrders = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: CART_ORDERS_QUERY,
      });
      setData(response.data.data);
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //Create Order Details Mapping
  const orderDetails = data?.orders?.flatMap(order => order.order_details || []) || [];

  //Enable/Disable Place Order Button
  useEffect(() => {
    setIsButtonEnabled(orderDetails.length !== 0);
  }, [orderDetails]);

  // Update total item quantity when quantities or orderDetails change
  useEffect(() => {
    const total = orderDetails.reduce((sum, item) => {
      const quantity = quantities[item.uuid] ?? item.quantity ?? 0;
      return sum + quantity;
    }, 0);
    setTotalItemQuantity(total);
  }, [quantities, orderDetails]);

  const handleIncrease = async (uuid, orderId) => {
    const currentQty = quantities[uuid] || 1;
    const newQty = currentQty + 1;

    setQuantities(prev => ({
      ...prev,
      [uuid]: newQty,
    }));

    await syncItemQuantity(orderId, uuid, newQty);
  };

  //Decrease Cart Quantity
  const handleDecrease = async (orderId, uuid) => {
    const currentQty = quantities[uuid] !== undefined
      ? quantities[uuid]
      : orderDetails.find(order => order.uuid === uuid)?.quantity || 1;

    const newQty = currentQty - 1;

    if (newQty < 1) {
      setQuantities(prev => {
        const { [uuid]: _, ...rest } = prev;
        return rest;
      });

      await removeItem(orderId, uuid);
      toast.success("Item removed from cart!");
      setIsCartExpanded(false);
    } else {
      setQuantities(prev => ({
        ...prev,
        [uuid]: newQty,
      }));

      await syncItemQuantity(orderId, uuid, newQty);
    }
  };

  //Sync Cart Item Quantity 
  const syncItemQuantity = async (orderId, uuid, quantity) => {
    try {
      await axios.post(import.meta.env.VITE_API_URL, {
        query: UPDATE_CART_ITEM_QUANTITY(orderId, uuid, quantity),
      });
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  // Place Order 
  const placeOrder = async () => {
    try {
      for (const order of orderDetails) {
        const response = await axios.post(import.meta.env.VITE_API_URL, {
          query: PLACE_ORDER(order.primary_id),
        });
        await removeItem(order.primary_id, order.uuid);
      }
      toast.success("Order successfully placed!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place orders.");
    }
  };

  //Delete Cart Item
  const removeItem = async (id, productId) => {
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        query: REMOVE_ITEM(id, productId),
      });

      setQuantities(prev => {
        const { [id]: _, ...rest } = prev;
        localStorage.setItem('cart_quantities', JSON.stringify(rest));
        return rest;
      });

      fetchOrders();
    } catch (error) {
      console.error(error.response || error);
      toast.error("Failed to remove item.");
    }
  };

  //Display Total Amount
  const totalAmount = orderDetails.reduce((acc, item) => {
    const price = item.prices[0]?.amount || 0;
    const quantity = quantities[item.uuid] || item.quantity;
    return acc + price * quantity;
  }, 0);

  //Get Currency Symbol
  const currencySymbol = orderDetails[0]?.prices[0]?.currency.symbol || '$';

  //Get Total Items Quantity (fallback — NOT reactive)
  const totalQuantity = orderDetails.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="cart-overlay position-relative px-3 container" data-testid="cart-overlay">
      <div className="cart-overlay-container position-absolute end-0 p-4 bg-white">
        <h6 className="fw-bold text-start mb-3">
          My Bag:
          <span className="ms-2 text-small small">
            {totalItemQuantity} item{totalItemQuantity !== 1 && 's'}          
          </span>        
        </h6>
        {orderDetails.map(item => (
          <div className="row align-items-start mb-3" key={`${item.primary_id}-${JSON.stringify(item.attrs)}`}>
            <div className="col-9">
              <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start">
                <p className="product-name mb-0 me-2">{item.name}</p>
                <div className="cart-action d-flex flex-column align-items-center mt-2 mt-md-0">
                  <button
                    className="plus btn btn-sm btn-outline-secondary"
                    onClick={() => handleIncrease(item.uuid, item.primary_id)}
                    data-testid="cart-item-amount-increase"
                  >
                    +
                  </button>
                  <button
                    className="minus btn btn-sm btn-outline-secondary mt-2"
                    onClick={() => handleDecrease(item.primary_id, item.uuid)}
                    data-testid="cart-item-amount-decrease"
                  >
                    -
                  </button>
                </div>
              </div>

              <div className="attributes my-2 gap-2">
                {item.attrs.map(attr => {
                  const kebabAttrName = attr.name.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={attr.id} className="attribute-group">
                      <p className="mb-1 fw-semibold mt-3">{attr.name}:</p>
                      <div
                        className="d-flex gap-1 flex-wrap"
                        data-testid={`cart-item-attribute-${kebabAttrName}`}
                      >
                        {attr.items.map((attrItem, index) => {
                          const isSelected = attrItem.selected;
                          const kebabAttrValue = attrItem.display_value.toLowerCase().replace(/\s+/g, '-');
                          const testId = `cart-item-attribute-${kebabAttrName}-${kebabAttrValue}${isSelected ? '-selected' : ''}`;
                          if (attr.type === 'swatch') {
                            return (
                              <div
                                key={`swatch-${attrItem.id || attrItem.value || attrItem.display_value || index}`}
                                title={attrItem.display_value}
                                style={{
                                  width: '24px',
                                  height: '24px',
                                  backgroundColor: attrItem.value,
                                  border: isSelected ? '2px solid black' : '1px solid #ccc',
                                  borderRadius: '0',
                                  cursor: 'default',
                                }}
                                data-testid={testId}
                              />
                            );
                          } else {
                            return (
                              <span
                                key={`badge-${attrItem.id || attrItem.value || attrItem.display_value || index}`}
                                className={`badge text-wrap ${
                                  isSelected ? 'bg-dark text-white' : 'bg-light text-muted'
                                }`}
                                style={{
                                  cursor: 'default',
                                  minWidth: '40px',
                                  textAlign: 'center',
                                  padding: '10px',
                                  border: '1px solid #000'
                                }}
                                data-testid={testId}
                              >
                                {attrItem.display_value}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="d-flex justify-content-between mt-3">
                <p className="product-price fw-bold">
                  {currencySymbol}
                  {(item.prices[0]?.amount || 0).toFixed(2)}
                </p>
                <p
                  className="product-quantity text-end fw-bold"
                  data-testid="cart-item-amount"
                >
                  Qty: {quantities[item.uuid] || item.quantity}
                </p>
              </div>
            </div>

            <div className="col-3 text-end cart-overlay-product-preview-container">
              <img src={item.photo} alt={item.name} className="img-fluid" />
            </div>

            <input
              type="hidden"
              name="quantity"
              value={quantities[item.uuid] || item.quantity}
            />
          </div>
        ))}

        <div className="total-price d-flex justify-content-between" data-testid="cart-total">
          <h6>Total</h6>
          <h6 className="fw-bold">
            {currencySymbol}
            {totalAmount.toFixed(2)}
          </h6>
        </div>

        <div className="d-flex justify-content-center mt-4">
          <div className="mt-1 w-100">
            <button
              className="btn btn-lg btn-custom-primary w-100 mb-2"
              disabled={!isButtonEnabled}
              onClick={() => placeOrder()}
              type="button"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CartOverlay;
