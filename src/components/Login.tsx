import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient";
interface IUser {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-10">
      <div className="mb-10 p-4 rounded-md bg-light-grey shadow-lg">
        <p className="text-red-500">{errorMessage}</p>
      </div>

      <form
        onSubmit={handleLogin}
        className="p-8 flex flex-col bg-light-grey rounded-md shadow-lg"
      >
        <h1 className="text-3xl text-red-600 mb-4">Login</h1>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm text-red-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="p-2 text-gray-500 focus:outline-none"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-2">
          <label className="mb-1 text-sm text-red-600">Password</label>
          <input
            type="password"
            name="password"
            placeholder={"password"}
            required
            className="p-2 text-gray-500 focus:outline-none"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-6 py-2 px-6 rounded-sm self-start text-sm
      text-white bg-red-600 duration-200 border-solid
      border-2 border-transparent hover:border-red-600 hover:bg-white
      hover:text-red-600"
        >
          Login
        </button>

        <Link to={"/register"} className="text-sm mt-6 text-center">
          Don't have an account? <span className="text-red-600">Register</span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
