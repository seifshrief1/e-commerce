import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";
import {
  FaShoppingCart,
  FaShippingFast,
  FaTags,
  FaPlusSquare,
} from "react-icons/fa";

const WhatOurWebOffers = () => {
  const offers = [
    {
      icon: <FaShoppingCart className="text-4xl text-blue-500" />,
      title: "تجربة تسوق مريحة",
      description:
        "استمتع بتجربة تسوق سهلة وممتعة مع مجموعة واسعة من المنتجات.",
    },
    {
      icon: <FaShippingFast className="text-4xl text-green-500" />,
      title: "شحن سريع وآمن",
      description: "نوفر خدمات شحن سريعة وآمنة لجميع الطلبات.",
    },
    {
      icon: <FaTags className="text-4xl text-yellow-500" />,
      title: "أفضل العروض والخصومات",
      description: "احصل على أفضل العروض والخصومات المميزة.",
    },
    {
      icon: <FaPlusSquare className="text-4xl text-purple-500" />,
      title: "إضافة منتجات للبيع",
      description: "يمكنك إضافة منتجاتك الخاصة للبيع بسهولة وسرعة.",
    },
  ];
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.fromTo(
      ".whatWeOffer",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        duration: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".whatWeOffer",
          toggleActions: "restart",
        },
      }
    );
  }, []);

  return (
    <div className="py-10 px-5 whatWeOffer">
      <div>
        <h2 className="md:text-5xl text-3xl font-extrabold tracking-tighter text-center mb-8">
          ماذا يقدم موقعنا؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg p-5 flex flex-col items-center text-center"
            >
              <div className="mb-4">{offer.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>

      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/c32512111875635.6009d0e35132a.png"
        className="mt-10 sm:block hidden"
      />
    </div>
  );
};

export default WhatOurWebOffers;
