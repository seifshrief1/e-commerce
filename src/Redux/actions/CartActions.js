import {
  collection,
  deleteDoc,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from 'react-toastify';

export const addToCart = (product, user) => {
  return async (dispatch) => {
    try {
      if (!user) {
        toast.error('يرجى تسجيل الدخول للحصول علي هذة المزايا', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        });
      } else {
        const cartProduct = {
          ...product,
          userWhoAddProductToCartId: user?.id,
          quantity: 1,
        };
        await setDoc(doc(db, "cart", product?.id), cartProduct);
        dispatch({ type: "ADD_TO_CART", payload: cartProduct });

        toast.success('تم اضافة المنتج بنجاح', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "light",
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
};


export const removeFromCart = async (product, dispatch) => {
  try {
    await deleteDoc(doc(db, "cart", product.id));
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  } catch (error) {
    alert(error.message);
  }
};

export const getCart = (user) => {
  return async (dispatch) => {
    try {
      const cartCollection = collection(db, "cart");
      const cartQuery = query(
        cartCollection,
        where("userWhoAddProductToCartId", "==", user?.id || "mmmmmm")
      );
      const filteredCart = await getDocs(cartQuery);
      const cartArray = [];
      filteredCart.forEach((doc) => {
        cartArray.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: "GET_CART", payload: cartArray });
    } catch (error) {
      alert(error.message);
    }
  };
};

export const clearCart = () => {
  return async (dispatch) => {
    try {
      const cartCollection = collection(db, "cart");
      const cartQuery = query(cartCollection);
      const filteredCart = await getDocs(cartQuery);
      filteredCart.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      alert(error.message);
    }
  };
};
