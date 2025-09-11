import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../store/redux-store";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartList } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const total = cartList.reduce(
    (sum, item) => sum + item.productPerUnitSellPrice * item.qty,
    0
  );
  return (
    <div className="ml-1 flex flex-col flex-1 sm:p-6 p-3">
      <h1 className="bg-white z-10 sm:text-3xl text-2xl font-bold text-blue-700 border-b-2 border-gray-200 pb-4 mb-6">
        🛒 Shopping Cart
      </h1>

      <div className="flex flex-col gap-4">
        {cartList.length === 0 ? (
          <h1 className="text-xl font-semibold m-auto">Your cart is empty</h1>
        ) : (
          cartList.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-5"
            >
              <div className="flex gap-5 mb-1">
                <div>
                  <img
                    src={item.imageUrl}
                    alt="preview"
                    className="w-36 h-36 border rounded object-cover"
                  />
                </div>
                <div className="flex flex-1 justify-between">
                  <div>
                    <div className="text-xl font-semibold text-gray-800">
                      {item.productName}
                    </div>
                    <div className="text-gray-600 mb-3">
                      Price:{" "}
                      <span className="font-medium text-gray-800">
                        ₹{item.productPerUnitSellPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="font-medium text-gray-700">Qty:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        className="rounded-lg border border-gray-300 text-center p-1 w-12 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        onChange={(e) =>
                          dispatch(
                            cartAction.updateQty({
                              index,
                              qty: Number(e.target.value),
                              item,
                            })
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(cartAction.removeFromCart({ index }))
                    }
                    className="h-8 text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="sticky bottom-2 w-full mb-8 mt-8 sm:p-6 p-2 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm flex justify-between items-center">
        <span className="sm:text-lg text-sm font-bold text-gray-800">
          Total Price
        </span>
        <span className="sm:text-2xl text-xl font-bold text-blue-600">
          ₹ {total.toFixed(2)}
          <Link
            to="customer-details"
            className="ml-2 sm:text-2xl text-xl px-6 py-1 bg-yellow-300 hover:bg-yellow-400 text-stone-800 rounded-lg shadow transition-colors"
          >
            Next
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Cart;
