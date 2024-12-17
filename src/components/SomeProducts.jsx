import React, { useEffect } from "react";
import HomePageProductCard from "./HomePageProductCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/Redux/actions/GetProducts";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUser } from "@clerk/clerk-react";

const SomeProducts = () => {
  const products = useSelector((state) => state.getProducts.products);
  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    dispatch(fetchProducts(user));
  }, [products]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".product",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".product",
          toggleActions: "restart",
        },
      }
    );
  }, []);

  return (
    <div>
      <h1 className="md:text-5xl text-3xl font-extrabold tracking-tighter text-center mb-8 mt-20">
        بعض المنتجات
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 mt-5 gap-4 product">
        {products?.slice(0, 4)?.map((product, index) => (
          <HomePageProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
};

export default SomeProducts;
