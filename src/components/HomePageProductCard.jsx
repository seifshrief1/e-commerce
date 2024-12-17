import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "@/Redux/actions/CartActions";
import { useUser } from "@clerk/clerk-react";

const HomePageProductCard = ({ product, key }) => {
  const { user } = useUser();
  const dispatch = useDispatch();
  return (
    <div
      className="relative max-w-[350px] w-full p-4 border rounded-lg shadow-lg"
      key={key}
    >
      {/* Discount Badge */}
      {product.discountPercentage === 0 ? null : (
        <p className="bg-red-500 w-14 h-14 flex justify-center items-center text-center text-white text-lg absolute top-2 rounded-full">
          %{product.discountPercentage}
        </p>
      )}
      {/* Product Image */}
      <Link to={`/productDetails/${product.id}`} className="block mb-4">
        <div className="w-full h-[250px] overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      {/* Product Info */}
      <h2 className="text-xl mb-2 font-bold">{product.title}</h2>
      <p className="text-gray-500 text-sm line-clamp-3">
        {product.description}
      </p>
      <p className="text-xl p-2 font-semibold">${product.price.toFixed(2)}</p>
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-2 mt-2">
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
  );
};

export default HomePageProductCard;
