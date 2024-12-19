import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CiShoppingCart } from "react-icons/ci";
import { ModeToggle } from "./Toggle";
import HeaderModal from "@/Modals/HeaderModal";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { BaggageClaim } from "lucide-react";
import { getCart } from "@/Redux/actions/CartActions";

const Navbar = () => {
  const cart = useSelector((state) => state.cart.cart);

  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart(user));
  }, []);

  return (
    <>
      <header className="flex justify-between items-center p-5 backdrop-filter backdrop-blur-md sticky top-0 bg-opacity-40 shadow z-50">
        <Link to={"/"}>
          <h1 className="md:text-4xl text-3xl font-bold">اسم المتجر</h1>
        </Link>
        <ul className="md:flex hidden gap-5 items-center">
          <li className="hover:text-indigo-500 duration-300">
            <Link to={"/e-commerce"}>الرئيسية</Link>
          </li>
          <li className="hover:text-indigo-500 duration-300">
            <Link to={"/products"}>المنتجات</Link>
          </li>
          <li className="hover:text-indigo-500 duration-300">
            <Link to={"/create-product"}>انشاء منتج</Link>
          </li>
        </ul>
        <div className="flex gap-10 items-center">
          <div className="flex gap-2 items-center">
            <SignedOut>
              <SignInButton>
                <Button size="sm" variant="outline">
                  تسجيل الدخول
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="منتجاتي"
                    labelIcon={<BaggageClaim />}
                    href="/my-products"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
            <div className="md:block hidden">
              <Link to={"/cart"}>
                <p className="absolute bg-red-500 -mt-1 text-white w-4 text-sm h-4 text-center flex items-center justify-center rounded-full z-50">
                  {cart?.length}
                </p>
                <span className="text-3xl relative z-0">
                  <CiShoppingCart />
                </span>
              </Link>
            </div>
          </div>
          <div className="md:block hidden">
            <ModeToggle />
          </div>
        </div>
        <div className="md:hidden block">
          <HeaderModal />
        </div>
      </header>
    </>
  );
};

export default Navbar;
