import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStore } from "../api/api";
import { BiLoaderAlt } from "react-icons/bi";

const Signup = () => {
  const navigate = useNavigate();
  const storeName = useRef();
  const storeEmail = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (newStore) => {
    try {
      const res = await registerStore(newStore);
      return { ok: true, data: res.data };
    } catch (err) {
      if (err.response) {
        const { title, message } = err.response.data;

        if (title === "One or more validation errors occurred.") {
          setError(
            "Password must be 8 characters long and must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
          );
        } else if (message === "Email already exists") {
          setError("Email already exists!");
        } else {
          setError(message || "Something went wrong. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }

      return { ok: false, data: err.response };
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const nameVal = storeName.current.value.trim();
    const emailVal = storeEmail.current.value.trim();
    const passwordVal = password.current.value.trim();
    const confirmPasswordVal = confirmPassword.current.value.trim();

    if (!nameVal || !emailVal || !passwordVal || !confirmPasswordVal) {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    if (passwordVal !== confirmPasswordVal) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    const newPayload = {
      StoreName: nameVal,
      StoreEmail: emailVal,
      StorePassword: passwordVal,
    };

    const result = await register(newPayload);

    if (!result.ok) {
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/login");
    storeName.current.value = "";
    storeEmail.current.value = "";
    password.current.value = "";
    confirmPassword.current.value = "";
  };
  return (
    <div className="w-full md:w-[55%] p-6 md:p-8 mt-4 bg-white mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Create an Account
      </h2>

      <form
        onSubmit={signupHandler}
        className="md:w-[50%] w-[80%] flex flex-col gap-4 mx-auto"
      >
        <input
          ref={storeName}
          type="text"
          placeholder="Enter store name"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={storeEmail}
          type="email"
          placeholder="Enter store email"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <div className="flex-1">
          <input
            ref={password}
            type="password"
            placeholder="Enter password"
            className="w-full border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <input
          ref={confirmPassword}
          type="password"
          placeholder="Confirm password"
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
              Sign Up
            </button>
          </div>
        )}

        <p className="flex justify-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
