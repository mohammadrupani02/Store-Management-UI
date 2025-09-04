import React from "react";
import { Link } from "react-router-dom";
import { FaStore } from "react-icons/fa6";

const Header = () => {
  const storeName = sessionStorage.getItem("storeName");
  return (
    <>
      <header className="w-full h-12 md:h-16 bg-white shadow flex items-center px-4 md:px-7 justify-between">
        <Link to={"/"}>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">
            StoreOps
          </h1>
        </Link>
        {storeName && (
          <h1 className="text-lg md:text-xl font-medium text-gray-800 pr-4 flex items-center gap-2">
            <FaStore className="text-blue-600" /> {storeName}
          </h1>
        )}
      </header>
    </>
  );
};

export default Header;
