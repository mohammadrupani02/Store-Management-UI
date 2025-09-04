import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("All Products");
  const handler = (text) => {
    setActive(text);
  };

  return (
    <div className="h-screen w-[15%] shadow-lg">
      <div className="flex flex-col text-lg font-medium p-4 space-y-3">
        <Link
          onClick={() => handler("All Products")}
          to=""
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 transition ${
            active === "All Products" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          All Products
        </Link>
        <Link
          onClick={() => handler("Add Product")}
          to="add-product"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 transition ${
            active === "Add Product" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          Add Product
        </Link>
        <Link
          onClick={() => handler("Cart")}
          to="cart"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 transition ${
            active === "Cart" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          Cart
        </Link>
        <Link
          onClick={() => handler("Order History")}
          to="order-history"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 transition ${
            active === "Order History" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          Order History
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
