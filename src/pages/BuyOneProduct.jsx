import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const BuyOneProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: product.discountPercentage
              ? 1 * product.price * (1 - product.discountPercentage / 100)
              : 1 * product.price,
          },
        },
      ],
    });
  };

  const navigate = useNavigate();
  const onApproveOrder = (data, actions) => {
    console.log(data);
    return actions.order
      .capture()
      .then((details) => {
        const name = details.payer.name.given_name;
        toast.success(`اكتملت عملية الدفع بواسطة ${name}`);
      })
      .then(() => {
        navigate("/payment-success");
      });
  };
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
      <h1 className="md:text-5xl text-3xl mt-5 font-extrabold tracking-tighter text-center">
        الدفع
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-1 items-center">
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
                />
              </>
            )}
          </div>
        </div>
        {product && (
          <div className="flex items-center gap-5">
            <img src={product.image} className="w-20 h-20 object-cover" />
            <div className="flex flex-col gap-5">
              <h1 className="lg:text-xl font-bold">{product.title}</h1>
              <div className="flex gap-10 items-center">
                <p>الكمية: 1</p>
                <p>الخصم: {product.discountPercentage}%</p>
                <p>
                  اجمالي السعر:
                  {product.discountPercentage
                    ? 1 * product.price * (1 - product.discountPercentage / 100)
                    : 1 * product.price}
                  $
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BuyOneProduct;
