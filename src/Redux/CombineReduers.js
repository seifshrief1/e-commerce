import { combineReducers } from "redux";
import { getProducts } from "./Reducers/ProductsReducer";
import { cart } from "./Reducers/CartReducer";
import { myProducts } from "./Reducers/MyProductsReducer";


export const reducers = combineReducers({
  getProducts: getProducts,
  cart: cart,
  myProducts: myProducts
})