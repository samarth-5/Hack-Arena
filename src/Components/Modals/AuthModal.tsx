import { IoClose } from "react-icons/io5";
import Login from "./Login";
import Signup from './Signup';
import React, { useEffect } from "react";
import ResetPassword from "./ResetPassword";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";
import ModalPortal from "@/Components/ModalPortal";

export default function AuthModal() {

  const authModal = useRecoilValue(authModalState);
	const closeModal = useCloseModal();

  return (
  <ModalPortal>
    <div className="fixed inset-0 z-[9999]">

      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/75"
        onClick={closeModal}
      />

      {/* modal container */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-[450px] px-4 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-lg border border-gray-700 p-6">

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-transparent rounded-full text-gray-400 p-2 hover:bg-gray-700 hover:text-white"
              onClick={closeModal}
            >
              <IoClose className="h-6 w-6" />
            </button>
          </div>

          {authModal.type === "login"
            ? <Login />
            : authModal.type === "register"
            ? <Signup />
            : <ResetPassword />}
        </div>
      </div>

    </div>
  </ModalPortal>
  );
}

function useCloseModal() {
	const setAuthModal = useSetRecoilState(authModalState);

	const closeModal = () => {
		setAuthModal((prev) => ({ ...prev, isOpen: false, type: "login" }));
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return closeModal;
}