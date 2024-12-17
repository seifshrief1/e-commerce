import React from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaPlusCircle,
  FaUserPlus,
  FaFilter,
} from "react-icons/fa";

const HowToUseOurWeb = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-yellow-500" />,
      title: "1- تسجيل الدخول أو إنشاء حساب جديد",
      description:
        "قم بتسجيل الدخول بحسابك أو أنشئ حسابًا جديدًا للاستمتاع بجميع المزايا.",
    },
    {
      icon: <FaSearch className="text-4xl text-blue-500" />,
      title: "2- تصفح المنتجات وتصفيتها",
      description:
        "يمكنك تصفح المنتجات المختلفة واستخدام أدوات التصفية لتحديد احتياجاتك بدقة.",
    },
    {
      icon: <FaShoppingCart className="text-4xl text-green-500" />,
      title: "3- إضافة المنتجات إلى السلة",
      description: "قم بإضافة المنتجات المفضلة لديك إلى السلة بسهولة.",
    },
    {
      icon: <FaPlusCircle className="text-4xl text-purple-500" />,
      title: "4- إضافة منتجات للبيع",
      description: "قم بعرض منتجاتك الخاصة للبيع عبر الموقع.",
    },
    {
      icon: <FaFilter className="text-4xl text-red-500" />,
      title: "5- رؤية منتجاتك الخاصة",
      description:
        "يمكنك رؤية منتجاتك الخاصة عن طريق الضغط على صورتك الشخصية ثم اختيار 'منتجاتي'.",
    },
  ];

  return (
    <div className="px-5">
      <h2 className="md:text-5xl text-3xl md:mb-5 mb-8 font-extrabold tracking-tighter text-center">
        كيف تستخدم موقعنا؟
      </h2>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-8 justify-between">
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="shadow-md rounded-lg p-5 flex items-center gap-4"
            >
              <div>{step.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <img
          src="https://www.pngarts.com/files/16/E-Commerce-Free-PNG-Image.png"
          alt="Mobile Shopping Illustration"
          className="w-10/12 lg:w-1/3"
        />
      </div>
    </div>
  );
};

export default HowToUseOurWeb;
