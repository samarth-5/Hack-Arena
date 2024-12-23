import { authModalState } from "@/Atoms/authModalAtom";
import { auth } from "@/firebase/firebase";
import React, { useEffect, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";

export default function ResetPassword() {

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClick=(type: "login" | "register" | "forgotPassword")=>{
    setAuthModalState((prev)=>({...prev,type}));
  }

  const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if(success)
      toast.success("Password reset email sent!", { position: "top-center", autoClose: 3000, theme: "dark" });
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);

  return (
    <form className="space-y-6 px-6 py-6 w-full max-w-md mx-auto" onSubmit={handleResetPassword}>
      
      <h3 className="text-2xl font-semibold text-white text-center">
        Reset Your Password
      </h3>
      <p className="text-sm text-gray-400 text-center">
        Enter your email address to receive a password reset link.
      </p>

      <div>
        <label
          htmlFor="email"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Email Address
        </label>
        <input onChange={(e) => setEmail(e.target.value)}
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

      <button type="submit"
              className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md
          py-3 transition-all duration-200">
        Reset Password
      </button>

      <div className="text-center text-sm text-gray-400 mt-4">
        Remembered your password?{" "}
        <button onClick={()=>handleClick("login")} className="text-white hover:text-gray-300 font-medium transition">
          Log In
        </button>
      </div>
    </form>
  );
}
