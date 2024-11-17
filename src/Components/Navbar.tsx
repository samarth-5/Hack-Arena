import Link from "next/link";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import Logout from "./Buttons/Logout";

type Props = {}

export default function Navbar({}: Props) {

	const [user] = useAuthState(auth);

	const setAuthModalState=useSetRecoilState(authModalState);

    const handleClick=()=>{
		setAuthModalState((prev)=>({...prev,isOpen:true}));
	}

    return (
		<div className='flex items-center justify-between px-20'>
			<Link href='/' className='flex items-center justify-center h-20'>
				<Image src='/favicon.ico' alt='Hack Arena' height={50} width={50} />
                <Image src='/logo.png' alt='Hack Arena' height={240} width={240} />
			</Link>
            <div className="flex gap-10 justify-between bg-black font-semibold text-white text-lg p-2 px-6 rounded-3xl">
                <Link href='/problems' className="hover:text-xl transition-all">Problems</Link>
                <Link href='/contests' className="hover:text-xl transition-all">Contests</Link>
                <Link href='/about' className="hover:text-xl transition-all">About</Link>
            </div>
			<div className='flex items-center'>
				{!user && (<button className='bg-black font-semibold text-white text-lg p-2 px-5 rounded-3xl hover:text-black hover:bg-white hover:outline transition-all duration-300 ease-in-out' 
                        onClick={handleClick}>
					Sign In
				</button>)}
				{
					user && (<div className='cursor-pointer group relative mr-5'>
						<Image src="/avatar.png"
                               alt="Avatar"
                               width={45}
                               height={45}
                               className="rounded-full border border-black" />
                        <div  className="absolute top-10 left-2/4 -translate-x-2/4 bg-dark-layer-1 text-brand-orange p-2 
                                          rounded-full border border-black shadow-lg z-40 
                                         group-hover:scale-100 scale-0 group-hover:bg-black group-hover:text-white
                                         transition-all duration-300 ease-in-out">
                            <p className="text-sm text-center">{user.email}</p>
                        </div>
					</div>)					
				}
				{user && <Logout />}
			</div>
		</div>
	);
}