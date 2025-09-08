import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  // const [active, setActive] = useState("All Products");
  // const handler = (text) => {
  //   setActive(text);
  // };
  const location = useLocation();
  let active;

  if (location.pathname.includes("add-product")) active = "Add Product";
  else if (location.pathname.includes("cart")) active = "Cart";
  else if (location.pathname.includes("order-history"))
    active = "Order History";
  else active = "All Products";

  return (
    <div className="md:h-screen md:w-[15%] w-full shadow-lg">
      <div className="flex md:flex-col flex-row gap-4 text-lg font-medium p-4 md:space-y-3 overflow-x-auto">
        <Link
          // onClick={() => handler("All Products")}
          to=""
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 flex-shrink-0 transition ${
            active === "All Products" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          All Products
        </Link>
        <Link
          // onClick={() => handler("Add Product")}
          to="add-product"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 flex-shrink-0 transition ${
            active === "Add Product" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          Add Product
        </Link>
        <Link
          // onClick={() => handler("Cart")}
          to="cart"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 flex-shrink-0 transition ${
            active === "Cart" ? "text-blue-600" : "text-stone-600"
          }`}
        >
          Cart
        </Link>
        <Link
          // onClick={() => handler("Order History")}
          to="order-history"
          className={`px-3 py-2 rounded-lg hover:bg-gray-200 border-b-2 flex-shrink-0 transition ${
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
