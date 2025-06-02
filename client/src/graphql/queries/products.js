export const PRODUCTS_QUERY = (id) => `
  query {
    products {
      slug
      name
      gallery
      amount
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
      currency {
        label
        symbol
      }
    }
  }
`;

// export const PRODUCTS_QUERY = (id) => `
//   query {
//       products {
//       slug 
//       name 
//       gallery
//       amount 
//       currency {
//         label
//         symbol
//       }
//       attribute_name
//       attribute_type
//       value
//       display_value
//     }
//     category(product_id: "${id}") {
//       product_name
//       product_id
//       category_name
//       gallery
//       amount
//       currency {
//         label
//         symbol
//       }
//     }
//   }
// `;