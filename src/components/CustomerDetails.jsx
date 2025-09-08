import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { cartAction, productsAction } from "../store/redux-store";

const CustomerDetails = () => {
  const cust_name = useRef();
  const phoneNumber = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartList } = useSelector((store) => store.cart);

  const order = async (orderData) => {
    const res = await createOrder(orderData);
    return { ok: true, data: res };
  };
  const orderHandler = async (e) => {
    e.preventDefault();
    let name = cust_name.current.value.trim();
    let number = phoneNumber.current.value.trim();

    if (!name || !number) {
      alert("Please enter both details");
    }

    const orderDetails = {
      customerDTO: {
        customerName: name,
        customerContactNumber: number,
      },
      orderItemDTOs: cartList.map((item) => ({
        productId: item.productId,
        quantity: item.qty,
      })),
    };

    const result = await order(orderDetails);

    if (result.ok) {
      toast.success("Order Placed");
      setTimeout(() => {
        navigate("order-invoice", { state: result.data.data });
        cust_name.current.value = "";
        phoneNumber.current.value = "";
      }, 1000);
      dispatch(productsAction.clearProducts());
      dispatch(cartAction.clearCart());
    } else {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="md:w-[50%] sm:w-[80%] w-[95%] bg-white shadow-lg m-auto rounded-2xl mt-8 p-6">
      <h1 className="bg-white text-3xl font-bold text-blue-700 border-b-2 border-gray-200 pb-4 mb-6">
        Customer Details
      </h1>
      <form onSubmit={orderHandler} className="w-full flex flex-col gap-4">
        <input
          ref={cust_name}
          type="text"
          placeholder="Customer Name"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={phoneNumber}
          type="text"
          placeholder="Customer Phone Number"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="m-auto flex justify-center">
          <button
            type="submit"
            className="w-16 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded-md transition duration-300 mt-2"
          >
            Buy
          </button>
          <ToastContainer position="top-right" autoClose={1000} />
        </div>
      </form>
    </div>
  );
};

export default CustomerDetails;
