import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { clearCart } from "@/Redux/actions/CartActions";

const Payment = () => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const cart = useSelector((state) => state.cart.cart);
  const reduxDispatch = useDispatch();
  const { user } = useUser();
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cart.reduce(
              (acc, item) =>
                acc +
                item.price * item.quantity +
                item.shippingPrice -
                (item.price * item.discountPercentage) / 100,
              0
            ),
          },
        },
      ],
    });
  };

  const navigate = useNavigate();
  const onApproveOrder = (data, actions) => {
    if (!user) {
      toast.error("الرجاء تسجيل الدخول لتمكين الدفع");
      return;
    }
    console.log(data);
    return actions.order
      .capture()
      .then((details) => {
        const name = details.payer.name.given_name;
        toast.success(`اكتملت عملية الدفع بواسطة ${name}`);
      })
      .then(() => {
        navigate("/payment-success");
        reduxDispatch(clearCart());
      });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="md:text-5xl text-3xl md:mb-5 mb-8 font-extrabold tracking-tighter text-center">
        الدفع
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-1">
        {/* Payment Details Section */}
        <div className="p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-6  border-b pb-3">
            دفع عن طريق
          </h2>
          <div className="checkout">
            {isPending ? (
              <p className="text-center text-xl font-bold">
                جاري تحميل طرق الدفع...
              </p>
            ) : (
              <>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => onCreateOrder(data, actions)}
                  onApprove={(data, actions) => onApproveOrder(data, actions)}
                  className="z-0"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {cart.length === 0 ? (
            <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin flex justify-center items-center m-auto"></div>
          ) : (
            cart.map((product) => (
              <>
                <div className="flex items-center gap-5">
                  <img src={product.image} className="w-20 h-20 object-cover" />
                  <div className="flex flex-col gap-5">
                    <h1 className="text-xl font-bold">{product.title}</h1>
                    <div className="flex gap-10 items-center">
                      <p>الكمية: {product.quantity}</p>
                      <p>الخصم: {product.discountPercentage}%</p>
                      <p>
                        اجمالي السعر:
                        {product.discountPercentage
                          ? product.quantity *
                            product.price *
                            (1 - product.discountPercentage / 100)
                          : product.quantity * product.price}
                        $
                      </p>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
