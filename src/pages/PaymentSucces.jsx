import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSucces = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center animate-fadeIn text-right">
        <div className="text-green-500 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mt-4">
          تم الدفع بنجاح
        </h1>
        <p className="text-gray-600 mt-2">
          شكراً لك على الدفع. تم إكمال العملية بنجاح.
        </p>
        <button
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg"
          onClick={() => navigate("/")}
        >
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default PaymentSucces;
