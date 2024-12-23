import Image from "next/image";
import Navbar from "@/Components/Navbar";
import AuthModal from "@/Components/Modals/AuthModal";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {}

export default function AuthPage({}: Props) {

  const authModal = useRecoilValue(authModalState);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
	if (user) 
	router.push("/");
	if (!loading && !user) 
	setPageLoading(false);
}, [user, router, loading]);
  
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
			<div className='max-w-7xl mx-auto'>
				<Navbar />
				<div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
					<Image src='/hero.png' alt='Hero img' width={700} height={700} />
				</div>
				{authModal.isOpen && <AuthModal />}
			</div>
		</div>
  )
}