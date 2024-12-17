import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeFromCart } from "@/Redux/actions/CartActions";
import { useUser } from "@clerk/clerk-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import SummaryCart from "@/components/SummaryCart";
import { toast } from "react-toastify";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();
  const { user } = useUser();

  useEffect(() => {
    dispatch(getCart(user));
  }, []);

  const incrementQuantity = async (product) => {
    try {
      await updateDoc(doc(db, "cart", product.id), {
        quantity: product.quantity + 1,
      });
      dispatch(getCart(user));
    } catch (error) {
      alert(error.message);
    }
  };

  const decrementQuantity = async (product) => {
    try {
      if (product.quantity <= 1) {
        toast.error("لا يمكن للكمية ان تكون اقل من 1");
        return;
      }
      await updateDoc(doc(db, "cart", product.id), {
        quantity: product.quantity - 1,
      });
      dispatch(getCart(user));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        سلة المشتريات
      </h1>

      {/* Cart Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {cart.length === 0 ? (
            <p className="text-xl text-center font-bold flex flex-col">
              ليس لديك منتجات في السلة
              <Link
                className="text-blue-500 underline font-light"
                to={"/products"}
              >
                تسوق الان!
              </Link>
            </p>
          ) : (
            <>
              <thead>
                <tr className="text-right">
                  <th className="px-4 py-3">الصورة</th>
                  <th className="px-4 py-3">اسم المنتج</th>
                  <th className="px-4 py-3">السعر</th>
                  <th className="px-4 py-3">الكمية</th>
                  <th className="px-4 py-3">الإجمالي</th>
                  <th className="px-4 py-3">السعر بعد الخصم</th>
                  <th className="px-4 py-3">الإجراء</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((product) => (
                  <tr key={product.id} className="text-right border-b">
                    <td className="px-4 py-3">
                      <img
                        src={product.image}
                        alt="منتج"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </td>
                    <td className="py-3 text-sm">{product.title}</td>
                    <td className="px-4 py-3">{product.price.toFixed(2)}$</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <span
                          onClick={() => incrementQuantity(product)}
                          className="cursor-pointer text-xl bg-gray-500 text-white w-5 h-5 flex justify-center items-center rounded-full hover:bg-gray-600"
                        >
                          +
                        </span>
                        <p className="text-lg">{product.quantity}</p>
                        <span
                          onClick={() => decrementQuantity(product)}
                          className="cursor-pointer text-xl bg-gray-500 text-white w-5 h-5 flex justify-center items-center rounded-full hover:bg-gray-600"
                        >
                          -
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {product.quantity === 1
                        ? product.price
                        : product.price * product.quantity}
                      $
                    </td>
                    <td className="px-4 py-3">
                      {product.discountPercentage
                        ? product.quantity *
                          product.price *
                          (1 - product.discountPercentage / 100)
                        : product.quantity * product.price}
                      $
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => removeFromCart(product, dispatch)}
                        className="group relative flex h-10 w-10 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
                      >
                        <svg
                          viewBox="0 0 1.625 1.625"
                          className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                          height="15"
                          width="15"
                        >
                          <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                          <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                          <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                        </svg>
                        <svg
                          width="16"
                          fill="none"
                          viewBox="0 0 39 7"
                          className="origin-right duration-500 group-hover:rotate-90"
                        >
                          <line
                            strokeWidth="4"
                            stroke="white"
                            y2="5"
                            x2="39"
                            y1="5"
                          ></line>
                          <line
                            strokeWidth="3"
                            stroke="white"
                            y2="1.5"
                            x2="26.0357"
                            y1="1.5"
                            x1="12"
                          ></line>
                        </svg>
                        <svg
                          width="16"
                          fill="none"
                          viewBox="0 0 33 39"
                          className=""
                        >
                          <mask fill="white" id="path-1-inside-1_8_19">
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                          </mask>
                          <path
                            mask="url(#path-1-inside-1_8_19)"
                            fill="white"
                            d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M12 6L12 29"
                          ></path>
                          <path
                            strokeWidth="4"
                            stroke="white"
                            d="M21 6V29"
                          ></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>

      {/* Summary Section */}
      <SummaryCart />
    </div>
  );
};

export default Cart;
