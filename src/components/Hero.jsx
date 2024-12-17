import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[60vh] lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text lg:text-6xl md:text-5xl text-4xl font-extrabold text-transparent">
            ابدا رحلة التسوق الان
            <span className="sm:block"> منتجات و خصومات رائعة </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            استمتع بأفضل المنتجات بأعلى الخصومات! نقدم لك تجربة تسوق لا مثيل
            لها.
          </p>
          <Link to="/products">
            <Button size="lg" className="mt-2 w-full text-xl" variant="outline">
              ابدا الان !
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
