import React, { useRef, useState } from "react";
import { orderHistory } from "../api/api";

const OrderHistory = () => {
  const number = useRef();
  const [order, setOrder] = useState();
  const [customer, setCustomer] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    const numVal = number.current.value.trim();
    if (numVal.length !== 10) {
      alert("Number should be of 10 digits");
      return;
    }

    try {
      const response = await orderHistory(numVal);
      setOrder(response.data.data);
      setCustomer(true);
      number.current.value = "";
    } catch (err) {
      if (err.response.data.message === "No customer found") {
        setCustomer(false);
      }
    }
  };

  return (
    <>
      <div className="p-4">
        <div className="w-full md:w-[55%] p-6 md:p-8 bg-white mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Order History
          </h2>

          <form
            onSubmit={submitHandler}
            className="md:w-[60%] w-[80%] flex flex-col gap-4 mx-auto"
          >
            <input
              ref={number}
              type="text"
              placeholder="Enter Phone Number"
              className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="m-auto flex justify-center">
              <button
                type="submit"
                className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-md transition duration-300"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        {!customer && (
          <p className="flex justify-center m-auto text-lg text-gray-600 mt-6">
            New Customer!
          </p>
        )}
        {customer && order && (
          <div className="p-4 mt-6">
            <h3 className="text-xl font-semibold mb-2">
              Customer: {order.customerName} ({order.contactNumber})
            </h3>
            <p className="mb-4 text-gray-700">
              Total Revenue:{" "}
              <span className="font-bold text-green-600">
                ₹{order.totalRevenue}
              </span>
            </p>

            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border">Order ID</th>
                  <th className="py-2 px-4 border">Date</th>
                  <th className="py-2 px-4 border">Items</th>
                  <th className="py-2 px-4 border text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.orderHistory.map((o) => (
                  <tr key={o.orderId} className="border-b">
                    <td className="py-2 px-4 border text-center">
                      ORD{o.orderId}
                    </td>
                    <td className="py-2 px-4 border text-center">{o.orderDate}</td>
                    <td className="py-2 px-4 border">
                      {o.items.map((item, idx) => (
                        <div key={idx}>
                          {item.productName} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 border text-right">
                      ₹{o.totalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
