import { authModalState } from '@/Atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';
import Image from "next/image";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import Logout from './Buttons/Logout';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsList } from 'react-icons/bs';
import Timer from './Timer';

type Props = {
    problemPage?: boolean;
}

export default function Topbar({problemPage}: Props) {

    const [user] = useAuthState(auth);

	const setAuthModalState=useSetRecoilState(authModalState);

    const handleClick=()=>{
		setAuthModalState((prev)=>({...prev,isOpen:true}));
	}

    const handleProblemChange=(isForward: boolean)=>{}
    
    return (
		  <div className='flex items-center justify-between px-5 h-12'>
			  <Link href='/' className='flex items-center justify-center'>
				    <Image src='/favicon.ico' alt='Hack Arena' height={30} width={30} />
            <Image src='/logo.png' alt='Hack Arena' height={150} width={150} />
			  </Link>
            
            {problemPage && (
					<div className="flex absolute left-20 items-center gap-4 flex-1 justify-center right-10">
                    <div
                      className="flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-900 h-9 w-9 cursor-pointer transition-all duration-200"
                      onClick={() => handleProblemChange(false)}>
                      <FaChevronLeft />
                    </div>
                    <Link
                      href="/problems"
                      className="flex items-center gap-2 font-medium max-w-[170px] text-gray-800 hover:text-gray-900 cursor-pointer transition-all duration-200"
                    >
                      <div>
                        <BsList className='text-xl' />
                      </div>
                      <p className='text-xl'>Problem List</p>
                    </Link>
                    <div
                      className="flex items-center justify-center rounded bg-gray-800 text-white hover:bg-gray-900 h-9 w-9 cursor-pointer transition-all duration-200"
                      onClick={() => handleProblemChange(true)}
                    >
                      <FaChevronRight />
                    </div>
                  </div>
                  
				)}

			<div className='flex items-center relative'>
				{!user && (<button className='bg-black font-semibold text-white text-md p-1 px-3 rounded-3xl hover:text-black hover:bg-white hover:outline transition-all duration-300 ease-in-out' 
                        onClick={handleClick}>
					Sign In
				</button>)}
        {user && problemPage && (<div className="bg-black text-white cursor-pointer rounded-full hover:bg-gray-800 transition-all duration-200"><Timer /></div>)}
				{
					user && (<div className='cursor-pointer group relative'>
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