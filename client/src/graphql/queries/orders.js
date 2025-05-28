export const CART_ORDERS_QUERY = `
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