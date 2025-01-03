import { authModalState } from "@/Atoms/authModalAtom";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {

  const setAuthModalState = useSetRecoilState(authModalState);

  const handleClick=(type: "login" | "register" | "forgotPassword")=>{
    setAuthModalState((prev)=>({...prev,type}));
  }

  const [inputs, setInputs] = useState({ email: "", name: "", password: "" });
  const router = useRouter();  
  
  const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
  //console.log(createUserWithEmailAndPassword);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
  
  const handleRegister = async(event: React.FormEvent) => {
    event.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.name) 
    return toast.error("Please fill all fields!", { position: "top-center", autoClose: 3000, theme: "dark" });

    try {
			const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
      //console.log(newUser);
			if (!newUser) 
      return;
      const userData = {
				uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputs.name,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solvedProblems: [],
				starredProblems: [],
			};
			await setDoc(doc(firestore, "users", newUser.user.uid), userData);

      toast.success("Account created successfully!", { position: "top-center", autoClose: 3000, theme: "dark" });
      setAuthModalState((prev) => ({ ...prev, isOpen: false }));
			router.push("/");
			//await setDoc(doc(firestore, "users", newUser.user.uid), userData);
		} 
    catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
      } else {
        toast.error("An unknown error occurred !", { position: "top-center", autoClose: 3000, theme: "dark" });
      }
    }
    
  };
  //console.log(user);

  useEffect(()=>{
    if(error)
      toast.error(error, { position: "top-center", autoClose: 3000, theme: "dark" });
  },[error]);

  return (
    <form
      className="space-y-6 px-6 py-6 w-full max-w-md mx-auto"
      onSubmit={handleRegister}
    >
      <h3 className="text-2xl font-semibold text-white text-center">
        Create Your Account!
      </h3>
      <p className="text-sm text-gray-400 text-center">
        Sign up to join <span className="font-semibold text-gray-200">Hacker&apos;s Arena</span>
      </p>

      <div>
        <label htmlFor="name" className="text-sm font-medium block mb-2 text-gray-300">
          Full Name
        </label>
        <input onChange={handleChangeInput}
          type="text"
          name="name"
          id="name"
          required
          className="border border-gray-500 rounded-md focus:ring focus:ring-gray-400 focus:border-gray-400
            block w-full p-3 bg-black text-gray-100 placeholder-gray-500 transition"
          placeholder="Lorem Ipsum"/>
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
          Email Address
        </label>
        <input onChange={handleChangeInput}
          type="email"
          name="email"
          id="email"
          required
          className="border border-gray-500 rounded-md focus:ring focus:ring-gray-400 focus:border-gray-400
            block w-full p-3 bg-black text-gray-100 placeholder-gray-500 transition"
          placeholder="name@company.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-sm font-medium block mb-2 text-gray-300"
        >
          Password
        </label>
        <input onChange={handleChangeInput}
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

      <button
        type="submit"
        className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-md
          py-3 transition-all duration-200"
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <div className="text-center text-sm text-gray-400 mt-4">
        Already have an account?{" "}
        <button onClick={()=>handleClick("login")} className="text-white hover:text-gray-300 font-medium transition">
          Sign In
        </button>
      </div>
    </form>
  );
}
