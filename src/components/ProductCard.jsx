import React from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../store/redux-store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    console.log(product);
    dispatch(cartAction.addToCart(product));
  };

  return (
    <div className="bg-stone-100 rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300 p-4 cursor-pointer flex flex-col justify-between border border-gray-100 truncate">
      <div className="flex items-center justify-center w-full h-36 mb-2 bg-white rounded-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="object-contain w-full h-full"
        />
      </div>
      <h1 className="text-xl font-bold text-gray-800 mb-3 truncate border-b-2 border-black">
        {product.productName}
      </h1>
      <div className="space-y-2 text text-gray-600">
        <p>
          <span className="font-medium text-gray-700">Cost Price: </span>₹
          {product.productPerUnitCostPrice}
        </p>
        <p>
          <span className="font-medium text-gray-700">Sell Price: </span>
          <span className="text-green-600 font-semibold">
            ₹{product.productPerUnitSellPrice}
          </span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Quantity: </span>
          {product.productQuantity <= 2 ? (
            <span className="text-red-600 font-semibold">
              {product.productQuantity} (Low Stock)
            </span>
          ) : (
            <span>{product.productQuantity}</span>
          )}
        </p>
      </div>

      <div className="flex items-center mt-auto pt-3 border-t border-gray-300">
        <button
          onClick={addToCart}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-800 text-white rounded-lg shadow transition-colors w-[80%] m-auto"
        >
          Add to Cart
        </button>
        <ToastContainer position="top-right" autoClose={1000} />
      </div>
    </div>
  );
};

export default ProductCard;
