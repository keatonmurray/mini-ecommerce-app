export const CART = ({
  size = [],
  color = [],
  capacity = [],
  keyboard = [],
  usb = [],
  attributes = [],
  isSizeSelected,
  isColorSelected,
  isCapacitySelected,
  isKeyboardSelected,
  isUsbSelected,
  id,
} = {}) => {
  const attrs = [
    {
      id: size[0]?.id ?? 'size-id',
      name: size[0]?.attribute_name ?? 'Size',
      type: size[0]?.type ?? 'text',
      items: size.map(attr => ({
        id: attr.id,
        value: attr.value,
        selected: isSizeSelected === attr.value,
        display_value: attr.display_value,
      })),
    },
    {
      id: color[0]?.id ?? 'color-id',
      name: color[0]?.attribute_name ?? 'Color',
      type: color[0]?.type ?? 'swatch',
      items: color.map(attr => ({
        id: attr.id,
        value: attr.value,
        selected: isColorSelected === attr.value,
        display_value: attr.display_value,
      })),
    },
    {
      id: capacity[0]?.id ?? 'capacity-id',
      name: capacity[0]?.attribute_name ?? 'Capacity',
      type: capacity[0]?.type ?? 'text',
      items: capacity.map(attr => ({
        id: attr.id,
        value: attr.value,
        selected: isCapacitySelected === attr.value,
        display_value: attr.display_value,
      })),
    },
    {
      id: keyboard[0]?.id ?? 'keyboard-id',
      name: keyboard[0]?.attribute_name ?? 'Keyboard',
      type: keyboard[0]?.type ?? 'text',
      items: keyboard.map(attr => ({
        id: attr.id,
        value: attr.value,
        selected: isKeyboardSelected === attr.value,
        display_value: attr.display_value,
      })),
    },
    {
      id: usb[0]?.id ?? 'usb-id',
      name: usb[0]?.attribute_name ?? 'USB',
      type: usb[0]?.type ?? 'text',
      items: usb.map(attr => ({
        id: attr.id,
        value: attr.value,
        selected: isUsbSelected === attr.value,
        display_value: attr.display_value,
      })),
    },
  ];

  const orderDetails = [
    {
      id: id ?? 'product-id',
      name: attributes[0]?.product_name ?? 'Product Name',
      photo: attributes[0]?.gallery?.[0] ?? '',
      attrs,
      prices: [
        {
          amount: attributes[0]?.amount ?? 0,
          currency: {
            label: attributes[0]?.currency?.label ?? 'USD',
            symbol: attributes[0]?.currency?.symbol ?? '$',
          },
        },
      ],
      quantity: 1,
    },
  ];
  
  // Escape string for GraphQL
  const orderDetailsString = JSON.stringify(orderDetails)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

  return `
    mutation {
      cart(order_details: "${orderDetailsString}")
    }
  `;
};
