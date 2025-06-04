export const REMOVE_ITEM = (id, uuid) => {
  return `
    mutation {
      removeItem(
        id: ${id},
        uuid: "${uuid}"
      )
    }
  `;
};
