import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Redux/actions/CartActions";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productCollection = collection(db, "products");
        const productQuery = query(productCollection, where("id", "==", id));

        const filteredProduct = await getDocs(productQuery);
        filteredProduct.forEach((doc) => {
          setProduct(doc.data());
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <>
      {product && (
        <div className="flex md:flex-row flex-col-reverse justify-evenly items-center p-6 gap-10">
          <div className="max-w-lg">
            <div className="flex gap-5 items-center mb-5">
              <p className="text-gray-500 text-sm mb-2">
                ماركة المنتج: {product.brand}
              </p>
              <p className="bg-red-600 text-white font-bold inline-block py-2 px-4 rounded-full text-sm">
                %{product.discountPercentage} خصم
              </p>
            </div>
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold mb-4">
              {product.title}
            </h1>
            <p className="text-5xl mb-4 flex flex-col gap-1 py-4">
              <span className="text-sm text-gray-500">:السعر</span>$
              {product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700 mb-2">{product.description}</p>
            <p className="flex gap-2 items-center mb-2 text-gray-500">
              التوصيل: {product.shippingInformation}
            </p>
            <p className="flex gap-2 items-center mb-2 text-gray-500">
              الضمان: {product.warrantyInformation}
            </p>
            <p className="flex gap-2 items-center mb-2 text-gray-500">
              سعر الشحن: {Number(product.shippingPrice).toFixed(2)}
            </p>
            <hr />
            <div className="flex justify-between gap-2 mt-5">
              <Link to={`/buy-product/${product.id}`}>
                <Button variant="outline">شراء</Button>
              </Link>
              <Button
                className="w-full text-lg"
                onClick={() => dispatch(addToCart(product, user))}
              >
                اضف الي السلة
              </Button>
            </div>
          </div>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="lg:w-[500px] md:w-[400px] w-[700px]"
          />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
