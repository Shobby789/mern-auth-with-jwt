import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API } from "../api/api";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const res = await axios.post(`${BASE_API}/login`, data);
      console.log("Login res", res);
      alert(res?.data?.message);
      Cookies.set("userToken", res?.data?.token);
      navigate("/");
    } catch (error) {
      console.log("login err >>", error);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-20 2xl:px-40 py-12 lg:py-20 flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full border mx-auto lg:w-1/3 flex flex-col gap-6 p-10"
      >
        <h2 className="text-center font-semibold text-2xl">Login Again</h2>
        <div className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2.5 border text-sm outline-none w-full text-black"
          />
        </div>
        <div className="w-full">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2.5 border text-sm outline-none w-full text-black"
          />
        </div>
        <button
          type="submit"
          className="py-2.5 bg-blue-500 text-sm font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
