import { db } from "@/firebase";
import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import imageCompression from "browser-image-compression";

const compressImage = async (file) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const base64Image = await convertBlobToBase64(compressedFile);

    return base64Image;
  } catch (error) {
    console.error("Error compressing the image:", error);
    throw error;
  }
};

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const createProduct = (
  title,
  description,
  price,
  discount,
  brand,
  category,
  warranty,
  shippingInfo,
  shippingPrice,
  image,
  user
) => {
  return async (dispatch) => {
    try {
      if (!user) {
        toast.error("يرجى تسجيل الدخول لانشاء المنتج");
      } else {

        if (!title || !description || !price || !brand || !category || !shippingInfo || !image) {
          toast.error("يرجى ملء جميع بيانات المنتج");
          return;
        }

        const base64Image = await compressImage(image);

        const productData = {
          title,
          description,
          category,
          brand,
          price: parseFloat(price),
          discountPercentage: parseFloat(discount) || 0,
          shippingInformation: shippingInfo,
          warrantyInformation: warranty || "",
          image: base64Image,
          userId: user.id,
          id: uuidv4(),
          shippingPrice: shippingPrice
        };

        await setDoc(doc(db, "products", productData.id), productData);

        dispatch({ type: "CREATE_PRODUCT", payload: productData });

        toast.success("تم اضافة المنتج بنجاح");
      }

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
};


export const removeMyProduct = async (product, dispatch) => {
  try {
    await deleteDoc(doc(db, "products", product.id));
    dispatch({ type: "DELETE_MY_PRODUCT", payload: product });
  } catch (error) {
    alert(error.message);
  }
};


export const getMyProducts = (user) => {
  return async (dispatch) => {
    try {
      const productsCollection = collection(db, "products");
      const productsQuery = query(productsCollection, where("userId", "==", user?.id));
      const filteredProducts = await getDocs(productsQuery);
      const productsArray = [];
      filteredProducts.forEach((doc) => {
        productsArray.push(doc.data());
      });
      dispatch({ type: "GET_MY_PRODUCTS", payload: productsArray });
    } catch (error) {
      alert(error.message);
    }
  };
}

export const searchProducts = (search) => {
  return async (dispatch, getState) => {
    if (!search) {
      toast.error("يرجى كتابة عنوان المنتج");
    }
    try {
      const { products } = getState().getProducts;
      const searchProduct = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
      });
      const productsArray = [];
      searchProduct.forEach((product) => {
        productsArray.push(product);
      })
      dispatch({ type: "SEARCH_PRODUCTS", payload: productsArray });
    } catch (error) {
      alert(error.message);
    }
  };
}

export const filterProducts = (category, brand) => {
  return async (dispatch, getState) => {
    try {
      const { products } = getState().getProducts;

      // Filter logic
      const filteredProducts = products.filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesBrand = brand ? product.brand === brand : true;
        return matchesCategory && matchesBrand;
      });

      dispatch({ type: "FILTER_PRODUCTS", payload: filteredProducts });
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };
};
