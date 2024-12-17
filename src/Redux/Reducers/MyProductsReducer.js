const initState = {
  myProduct: []
}

export const myProducts = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PRODUCT":
      return {
        ...state,
        myProduct: [...state.myProduct, action.payload]
      }
    case "DELETE_MY_PRODUCT":
      return {
        ...state,
        myProduct: state.myProduct.filter((product) => product.id !== action.payload.id)
      };
    case "GET_MY_PRODUCTS":
      return {
        ...state,
        myProduct: action.payload,
      };
    default:
      return state;
  }
}