import { Link, useLocation } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();
  const storeName = sessionStorage.getItem("storeName");
  if (!state) {
    return <p>No order data found.</p>;
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 mt-4">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          {storeName}
        </h1>

        <div className="flex justify-between border-b pb-2 mb-4 text-sm">
          <div>
            <p className="font-semibold">Invoice</p>
          </div>
          <div className="text-right">
            <p>Date: {state.data.orderDate}</p>
            <p>Order Id: {state.data.orderId}</p>
          </div>
        </div>

        <div className="mb-4 text-sm">
          <p className="font-semibold mb-1">Bill To:</p>
          <p>{state.data.customerName}</p>
          <p>Phone: {state.data.contactNumber}</p>
        </div>

        <table className="w-full text-sm border-collapse mb-4">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left py-2 px-3">Description</th>
              <th className="text-center py-2 px-3">Qty</th>
              <th className="text-right py-2 px-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {state.data.orderItems.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{item.productName}</td>
                <td className="text-center py-2 px-3">{item.quantity}</td>
                <td className="text-right py-2 px-3">
                  ₹{item.subTotal.toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2" className="font-bold py-3 px-3 text-right">
                Total
              </td>
              <td className="font-bold text-right py-3 px-3">
                ₹{state.data.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <p className="text-sm text-gray-600 mt-4">Do Visit Again, Thank you!</p>
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <Link to={"/home"} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Home
        </Link>
      </div>
    </>
  );
};

export default Invoice;
