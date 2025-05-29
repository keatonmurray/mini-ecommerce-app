export const PLACE_ORDER = (orderId, quantity = 5) => `
  mutation {
    placed_order(quantity: ${quantity}, order_id: ${orderId})
  }
`;
