export const UPDATE_CART_ITEM_QUANTITY = (order_id, item_id, newQuantity) => `
  mutation {
    updateItemQuantity(
      order_id: ${order_id},
      item_id: "${item_id}",
      newQuantity: ${newQuantity}
    )
  }
`;
