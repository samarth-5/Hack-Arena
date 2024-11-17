import { auth } from '@/firebase/firebase';
import React from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { FiLogOut } from 'react-icons/fi';

type Props = {}

export default function Logout({}: Props) {
    const [signOut, loading, error] = useSignOut(auth);

	const handleLogout = () => {
		signOut();
	};
	return (
		<button className="bg-black text-white py-3 px-3 cursor-pointer rounded-full hover:bg-gray-800 transition-all duration-200"
		  onClick={handleLogout}>
		  <FiLogOut className="text-xl" />
		</button>
	  );
	  
	  
}