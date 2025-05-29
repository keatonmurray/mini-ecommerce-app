export const PRODUCT_CATEGORIES = () => `
    query {
        categories {
            product_id
            category_name
        }
    }
`