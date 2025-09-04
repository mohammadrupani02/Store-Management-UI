import React from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="w-full sm:w-[55%] p-4 md:p-6 flex flex-col gap-5 m-2">
      <h1 className="text-4xl md:text-5xl font-bold text-stone-700">
        Welcome to <span className="text-blue-600">StoreOps</span> — your smart
        store management partner
      </h1>
      <p className="font-semibold text-xl text-stone-600">
        <span className="text-blue-600">StoreOps</span> helps you manage your
        store effortlessly. From tracking inventory and generating invoices to
        analyzing sales data, we provide all the tools you need to run your
        store efficiently and make smarter business decisions.
      </p>
      <div className="flex flex-row gap-2">
        <Link to={"/login"}>
          <button className="w-20 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="w-24 px-3 md:px-4 py-1.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
