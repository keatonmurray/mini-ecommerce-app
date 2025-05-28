export const ATTRIBUTES_QUERY = (id) => `
    query {
        attributes(product_id: "${id}") {
        product_name
        gallery
        description
        amount
        currency {
            label
            symbol
        }
        }
        size(product_id: "${id}") {
        attribute_name
        product_id
        display_value
        value
        attribute_id
        }
        color(product_id: "${id}") {
        attribute_name
        product_id
        display_value
        attribute_id
        value
        }
        capacity(product_id: "${id}") {
        attribute_name
        product_id
        display_value
        attribute_id
        value
        }
        usb(product_id: "${id}") {
        attribute_name
        product_id
        display_value
        attribute_id
        value
        }
        keyboard(product_id: "${id}") {
        attribute_name
        product_id
        display_value
        attribute_id
        value
        }
    }`
