import MyProductsCard from "@/components/MyProductsCard";
import { getMyProducts } from "@/Redux/actions/ProductActions";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyProducts = () => {
  const myProducts = useSelector((state) => state.myProducts.myProduct);
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    dispatch(getMyProducts(user));
  }, [myProducts]);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mt-20">
        منتجاتي ({myProducts.length})
      </h1>
      {myProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
            alt="No products"
            className="max-w-[400px] mb-10"
          />
          <h2 className="text-3xl font-semibold mb-5">لا يوجد منتجات هنا</h2>
          <p className="text-lg mb-5 text-center">
            يبدو أنك لم تقم بإضافة أي منتجات حتى الآن. ابدأ الآن وساهم بمنتجاتك!
          </p>
          <Link
            to="/create-product"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            إضافة منتج جديد
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gird-cols-1 gap-4 mt-10">
          {myProducts.map((product) => (
            <MyProductsCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
