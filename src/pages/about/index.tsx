import Navbar from '@/Components/Navbar';
import Link from 'next/link';
import Image from "next/image";
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';

type Props = {}

export default function AboutPage({}: Props) {

  const authModal = useRecoilValue(authModalState);

  return (
    <>
      <Navbar />
      <section className='my-20 mx-[200px] full-screen-bg'>
        <div>
          <Image src='/Samarth.jpg' alt='profile' height={200} width={200} className='rounded-full mb-5 outline outline-2 outline-black' />
        </div>
        <div className='flex justify-between'>
          <h1 className='text-3xl font-semibold mb-4'>About <Link target='_blank' href='/'><span className='underline font-bold hover:text-blue-600 hover:scale-110 text-black'>HackArena</span></Link> (Developed by Samarth)</h1>
          <Link target='_blank' href='https://samarth-dev.onrender.com/'><FaGlobe size={30} className='text-black mr-5 hover:scale-150 duration-300' /></Link>
        </div>
        <p className='mb-4'>
          Welcome to HackArena, a cutting-edge platform designed to transform the way programmers practice and master coding. Whether you’re preparing for interviews or honing your problem-solving skills, HackArena offers an extensive library of <span className='font-semibold'>Data Structures and Algorithm questions</span>, tailored for all experience levels. Our platform fosters a seamless learning experience, helping users gain confidence while tackling real-world challenges.
        </p>
        <p className='mb-4'>
          What sets HackArena apart is its dynamic approach to coding contests. Regularly hosted competitive programming events enable users to push their limits and measure their performance against a global community of developers. The interactive leaderboard system ensures transparency and motivates participants to continuously improve while fostering a healthy competitive environment.
        </p>
        <p className='mb-4'>
          Beyond coding challenges,HackArena provides a platform for community engagement and collaboration. With its intuitive interface and well-structured problems, it caters to beginners and seasoned developers alike. Join HackArena today and become part of a growing community dedicated to learning, competing, and excelling in the world of technology.
        </p>
        <div className='px-5 py-3 flex gap-3 outline outline-slate-600 hover:outline-black rounded-3xl w-min'>
          <Link target='_blank' href='https://www.linkedin.com/in/samarth-narayan-4a4998250/' className='hover:scale-150 duration-500'><FaLinkedin size={25} className='hover:text-black' /></Link> 
          <Link target='_blank' href='https://github.com/samarth-5' className='hover:scale-150 duration-500'><FaGithub size={25} className='hover:text-black' /></Link>
          <Link target='_blank' href='https://leetcode.com/u/samarth_123_/' className='hover:scale-150 duration-500'><SiLeetcode size={25} className='hover:text-black' /></Link>
          <Link target='_blank' href='https://www.instagram.com/samarth123_/' className='hover:scale-150 duration-500'><FaInstagram size={25} className='hover:text-black' /></Link>
        </div>
      </section>
      {authModal.isOpen && <AuthModal />}
    </>
  )
}
