import { Route, Routes, Redirect } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { useEffect, useState } from "react";
import Shop from "./pages/Shop";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./pages/Cart";
import Payment from "./pages/PaymentForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProducts from "./pages/MyProducts";
import PaymentSucces from "./pages/PaymentSucces";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import BuyOneProduct from "./pages/BuyOneProduct";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setLoading(true);
  }, []);

  const initialOptions = {
    "client-id": `${import.meta.env.VITE_REACT_APP_PAYPAL_CLIENT_ID}`,
    currency: "USD",
    intent: "capture",
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <ToastContainer />
          <Navbar />
          <Routes>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" element={Home} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Shop />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/payment"
              element={
                <PayPalScriptProvider options={initialOptions}>
                  <Payment />
                </PayPalScriptProvider>
              }
            />
            <Route path="/payment-success" element={<PaymentSucces />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route
              path="/buy-product/:id"
              element={
                <PayPalScriptProvider options={initialOptions}>
                  <BuyOneProduct />
                </PayPalScriptProvider>
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
