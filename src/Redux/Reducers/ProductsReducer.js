const initState = {
  products: [],
  filterResults: null
}

export const getProducts = (state = initState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        filterResults: action.payload,
      };
    case "FILTER_PRODUCTS":
      return {
        ...state,
        filterResults: action.payload,
      };
    default:
      return state;
  }
};
