export const PLACE_ORDER = (orderId) => `
  mutation {
    placed_order(order_id: ${orderId})
  }
`;
