import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { ModeToggle } from "@/components/Toggle";
import { useSelector } from "react-redux";
const HeaderModal = () => {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>القائمة</SheetTitle>
          <SheetDescription>
            <ul className="flex flex-col gap-5 items-start text-2xl mt-5">
              <li>
                <Link to={"/home"}>الرئيسية</Link>
              </li>
              <li>
                <Link to={"/products"}>المنتجات</Link>
              </li>
              <li>
                <Link to={"/create-product"}>انشاء منتج</Link>
              </li>
            </ul>
            <div className="flex gap-2 mt-10 items-start">
              <div>
                <Link to={"/cart"}>
                  <p className="absolute bg-red-500 -mt-1 text-white w-4 text-sm h-4 text-center flex items-center justify-center rounded-full z-50">
                    {cart.length}
                  </p>
                  <span className="text-3xl relative z-0">
                    <CiShoppingCart />
                  </span>
                </Link>
              </div>
              <ModeToggle />
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderModal;
