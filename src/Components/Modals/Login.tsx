import { authModalState } from "@/Atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

type Props = {};

export default function Login({}: Props) {

  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();

  const handleClick=(type: "login" | "register" | "forgotPassword")=>{
    setAuthModalState((prev)=>({...prev,type}));
  }
  
  const [inputs, setInputs] = useState({ email: "", password: "" });
	
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

  const handleLogin = async(event: React.FormEvent) => {
    event.preventDefault();
		if (!inputs.email || !inputs.password) 
    return toast.error("Please fill all fields!", { position: "top-center", autoClose: 3000, theme: "dark" });
		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) 
      return;
      toast.success("User logged in successfully!", { position: "top-center", autoClose: 3000, theme: "dark" });
      setAuthModalState((prev) => ({ ...prev, isOpen: false }));
			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		}
  };

  //console.log(user);

  useEffect(()=>{
    if(error)
      toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
  },[error]);

  return (
    <form className="space-y-6 px-6 py-6 w-full max-w-md mx-auto" onSubmit={handleLogin}>

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
        <input onChange={handleInputChange}
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
        <input onChange={handleInputChange}
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
        {loading ? "Logging In..." : "Log In"}
      </button>

      <div className="text-right mt-4">
        <button onClick={()=>handleClick("forgotPassword")} className="text-sm text-gray-400 hover:text-gray-200 transition">
          Forgot Password?
        </button>
      </div>

      <div className="text-center text-sm text-gray-400 mt-4">
        Not registered?{" "}
        <button onClick={()=>handleClick("register")} className="text-white hover:text-gray-300 font-medium transition">
          Create account
        </button>
      </div>
    </form>
  );
}
