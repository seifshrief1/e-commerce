import WhatOurWebOffer from "@/components/WhatOurWebOffer";
import Hero from "../components/Hero";
import React from "react";
import SomeProducts from "@/components/SomeProducts";
import HowToUseOurWeb from "@/components/HowToUseOurWeb";

const Home = () => {
  return (
    <div>
      <Hero />
      <HowToUseOurWeb />
      <hr className="mt-5" />
      <WhatOurWebOffer />
      <SomeProducts />
    </div>
  );
};

export default Home;
