import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function Logout() {
    const [signOut] = useSignOut(auth);

    const handleLogout = () => {
        signOut();
        toast.success("User logged out successfully!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
        });
    };

    return (
        <button className="bg-black text-white py-3 px-3 cursor-pointer rounded-full hover:bg-gray-800 transition-all duration-200"
            onClick={handleLogout}>
            <FiLogOut className="text-xl" />
        </button>
    );
}
