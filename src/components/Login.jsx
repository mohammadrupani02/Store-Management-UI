import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStore } from "../api/api";
import { BiLoaderAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { productsAction } from "../store/redux-store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const login = async (loginCredentials) => {
    try {
      const response = await loginStore(loginCredentials);
      sessionStorage.setItem("token", response.data.data.token);
      sessionStorage.setItem("storeName", response.data.data.storeName);
      console.log(response.data.data);
      return { ok: true, data: response.data };
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "Login failed. Please try again."
        );
      } else {
        setError("Network error. Please check your internet connection.");
      }
      return { ok: false };
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const emailVal = email.current.value.trim();
    const passwordVal = password.current.value.trim();

    if (!emailVal || !passwordVal) {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    const loginCredentials = {
      StoreEmail: emailVal,
      StorePassword: passwordVal,
    };

    const result = await login(loginCredentials);

    if (!result.ok) {
      setLoading(false);
      return;
    }
    dispatch(productsAction.clearProducts())
    setLoading(false);
    navigate("/home");
    email.current.value = "";
    password.current.value = "";
  };

  return (
    <div className="w-full md:w-[55%] p-6 md:p-8 mt-4 bg-white mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Login to Your Account
      </h2>

      <form
        onSubmit={loginHandler}
        className="md:w-[45%] w-[80%] flex flex-col gap-4 mx-auto"
      >
        <input
          ref={email}
          type="email"
          placeholder="Enter store email"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={password}
          type="password"
          placeholder="Enter password"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {error && <p className="text-red-500 m-auto">{error}</p>}
        {loading && (
          <div className="m-auto flex justify-center bg-blue-600 rounded-md w-32 py-1.5">
            <BiLoaderAlt className="animate-spin w-6 h-6 text-white" />
          </div>
        )}
        {!loading && (
          <div className="m-auto flex justify-center">
            <button
              type="submit"
              className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-md transition duration-300"
            >
              Login
            </button>
          </div>
        )}

        <p className="flex justify-center text-sm text-gray-600">
          Don’t have an account?
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
