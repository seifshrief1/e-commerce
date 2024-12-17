import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase";


export const fetchProducts = (user) => {
  return async (dispatch) => {
    const productsCollection = collection(db, "products");
    const productsQuery = query(
      productsCollection,
      where("userId", "!=", user?.id || "mmmmmm")
    );
    const filterdProducts = await getDocs(productsQuery);
    const productsArray = []
    filterdProducts.forEach((doc) => {
      productsArray.push({ id: doc.id, ...doc.data() });
    })
    dispatch({
      type: "GET_PRODUCTS",
      payload: productsArray,
    })
  }
}