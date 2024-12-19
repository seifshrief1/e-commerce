import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { clearCart } from "@/Redux/actions/CartActions";
import { Link } from "react-router-dom";

const SummaryCart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className="mt-10 flex flex-col items-end space-y-6 p-6 w-full">
      <h2 className="text-2xl font-extrabold border-b pb-3 w-full text-right">
        ملخص الطلب
      </h2>
      <div className="text-lg font-medium space-y-4 w-full">
        <div className="flex justify-between items-center">
          <span>الإجمالي الفرعي:</span>
          <span className="font-semibold">
            {cart
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
            $
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>الخصم:</span>
          <span className="font-semibold">
            {cart.reduce(
              (acc, item) =>
                acc +
                (item.price * item.discountPercentage * item.quantity) / 100,
              0
            )}
            $
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>الشحن:</span>
          <span className="font-semibold">
            {cart.reduce(
              (acc, item) =>
                acc + !item.shippingPrice ? 0 : Number(item.shippingPrice),
              0
            )}
            $
          </span>
        </div>
        <hr className="border-gray-300 my-2" />
        <div className="flex justify-between items-center text-xl font-bold">
          <span>الإجمالي:</span>
          <span className="text-green-600">
            {cart
              .reduce(
                (acc, item) =>
                  acc +
                  item.price *
                    item.quantity *
                    (1 - item.discountPercentage / 100) +
                  (item.shippingPrice || 0),
                0
              )
              .toFixed(2)}
            $
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-between w-full">
        <Button onClick={() => dispatch(clearCart())} variant="destructive">
          محو السلة
        </Button>
        <Link to={cart.length === 0 ? "/cart" : "/payment"} className="w-full">
          <Button size="lg" className="w-full">
            الذهاب إلى الدفع
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SummaryCart;
