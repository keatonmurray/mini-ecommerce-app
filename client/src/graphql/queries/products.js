export const PRODUCTS_QUERY = (id) => `
  query {
    products {
      slug
      name
      gallery
      amount
      in_stock
      currency {
        label
        symbol
      }
    }
    category(product_id: "${id}") {
      product_name
      product_id
      category_name
      gallery
      amount
      in_stock
      currency {
        label
        symbol
      }
    }
  }
`;