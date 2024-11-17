import React from "react";

type Props = {};

export default function Login({}: Props) {
    
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login attempt submitted");
  };

  return (
    <form className="space-y-6 px-6 py-8 w-full max-w-md mx-auto" onSubmit={handleLogin}>

      <h3 className="text-2xl font-semibold text-white text-center">
        Welcome Back!
      </h3>
      <p className="text-sm text-gray-400 text-center">
        Sign in to continue to <span className="font-semibold text-gray-200">Hacker's Arena</span>
      </p>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="
            border border-gray-500 rounded-md focus:ring focus:ring-gray-400 focus:border-gray-400
            block w-full p-3 bg-black text-gray-100 placeholder-gray-500 transition
          "
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          required
          className="
            border border-gray-500 rounded-md focus:ring focus:ring-gray-400 focus:border-gray-400
            block w-full p-3 bg-black text-gray-100 placeholder-gray-500 transition
          "
          placeholder="••••••••"
        />
      </div>

      <button type="submit"
             className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md
          py-3 transition-all duration-200">
        Log In
      </button>

      <div className="text-right mt-4">
        <a href="#" className="text-sm text-gray-400 hover:text-gray-200 transition">
          Forgot Password?
        </a>
      </div>

      <div className="text-center text-sm text-gray-400 mt-4">
        Not registered?{" "}
        <a
          href="#"
          className="text-white hover:text-gray-300 font-medium transition"
        >
          Create account
        </a>
      </div>
    </form>
  );
}
