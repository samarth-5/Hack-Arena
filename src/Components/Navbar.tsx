import Link from "next/link";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";

type Props = {}

export default function Navbar({}: Props) {

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
				<button className='bg-black font-semibold text-white text-lg p-1.5 px-4 rounded-3xl hover:text-black hover:bg-white hover:outline' 
                        onClick={handleClick}>
					Sign In
				</button>
			</div>
		</div>
	);
}