import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import AllProducts from "./components/AllProducts";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import CustomerDetails from "./components/CustomerDetails";
import OrderInvoice from "./components/OrderInvoice";
import OrderHistory from "./components/OrderHistory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route path="/" element={<AboutUs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/home" element={<HomePage />}>
        <Route index element={<Navigate to="all-products" replace />} />
        <Route path="all-products" element={<AllProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="cart/customer-details" element={<CustomerDetails />} />
        <Route
          path="cart/customer-details/order-invoice"
          element={<OrderInvoice />}
        />
        <Route path="order-history" element={<OrderHistory />} />
      </Route>
    </Routes>
  );
}

export default App;
