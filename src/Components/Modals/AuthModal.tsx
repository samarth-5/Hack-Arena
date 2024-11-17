import { IoClose } from "react-icons/io5";
import Login from "./Login";
import React from "react";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75"></div>

      <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-lg border border-gray-700 relative w-full mx-6 p-6">
            
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-transparent rounded-full text-gray-400 p-2 hover:bg-gray-700 hover:text-white"
              >
                <IoClose className="h-6 w-6" />
              </button>
            </div>
			
            <Login />
          </div>
        </div>
      </div>
    </>
  );
}