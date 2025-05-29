export const REMOVE_ITEM = (id) => `
  mutation {
    removeItem(id: ${id})
}`