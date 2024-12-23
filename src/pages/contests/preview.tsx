import ContestQuestions from '@/Components/ContestQuestions';  // Import the component
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import Navbar from '@/Components/Navbar';
import { toast } from 'react-toastify';
import AuthModal from '@/Components/Modals/AuthModal';
import { useRecoilValue } from 'recoil';
import { authModalState } from '@/Atoms/authModalAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/firebase';
import Link from 'next/link';

type Props = {}; 

const CountdownTimer = ({ durationHours, stopTimerRef }: { durationHours: number; stopTimerRef: React.MutableRefObject<(() => void) | null>; }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const now = new Date().getTime();
    const endDate = new Date(now + durationHours * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;
      return {
        hours: Math.max(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0),
        minutes: Math.max(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 0),
        seconds: Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0),
      };
    };

    setTimeLeft(calculateTimeLeft());
    timerRef.current = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);

    stopTimerRef.current = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    return () => clearInterval(timerRef.current!); // Cleanup on unmount
  }, [durationHours, stopTimerRef]);

  return (
    <div className="flex items-center justify-center mr-[180px] bg-black text-white rounded-full px-4 py-2 text-lg font-semibold shadow-md">
      <span className="mx-1">{String(timeLeft.hours).padStart(2, '0')}:</span>
      <span className="mx-1">{String(timeLeft.minutes).padStart(2, '0')}:</span>
      <span className="mx-1">{String(timeLeft.seconds).padStart(2, '0')}</span>
    </div>
  );
};

const Preview = ({}: Props) => {
  const router = useRouter();
  const { title } = router.query;

  const [user] = useAuthState(auth);
  const authModal = useRecoilValue(authModalState);
  const [loadingProblems, setLoadingProblems] = useState(true); 

  const stopTimerRef = useRef<(() => void) | null>(null);

  const handleClick = () => {
    if (!user) {
      toast.error("Sign in to participate in contest!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    if (stopTimerRef.current) stopTimerRef.current();
    toast.success("You have successfully completed the contest!", {
      position: "top-center",
      autoClose: 3000,
      theme: "dark",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 mx-20">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold mb-4">Welcome to {title}</h1>
          {user ? (
            <CountdownTimer durationHours={2} stopTimerRef={stopTimerRef} />
          ) : null}
        </div>

        <div className="flex flex-col lg:flex-row mt-6">
          <div className="lg:w-3/4">
            <table className={`w-full text-sm text-left text-gray-800 sm:w-10/12 max-w-[1200px] bg-white shadow-lg rounded-xl ${!user ? "cursor-not-allowed" : ""}`}>
              <thead className="text-[16px] text-black-900 uppercase border-b bg-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold text-left">Question</th>
                  <th scope="col" className="px-6 py-3 font-semibold text-left">Difficulty</th>
                  <th scope="col" className="px-6 py-3 font-semibold text-left">Max. Points</th>
                  <th scope="col" className="px-6 py-3 font-semibold text-left">Status</th>
                </tr>
              </thead>
              <ContestQuestions setLoadingProblems={setLoadingProblems} /> 
            </table>

            <button
              className="bg-black mt-10 font-semibold text-white text-lg p-2 px-5 rounded-3xl hover:text-black hover:bg-white hover:outline transition-all duration-300 ease-in-out"
              onClick={handleClick}>
              End Contest
            </button>

            <hr className="my-8 mr-[140px] border-gray-300" />

            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <ul className="list-disc list-inside text-lg text-gray-800 space-y-2">
              <li>Read all the questions carefully before starting.</li>
              <li>Ensure a stable internet connection throughout the contest.</li>
              <li>Avoid refreshing or navigating away from the page during the contest.</li>
              <li>All answers must be submitted within the given time limit.</li>
              <li>Plagiarism or cheating will lead to disqualification.</li>
            </ul>
          </div>

          <div className="lg:w-1/4 h-[500px] bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              Prizes <Image src='/cup.png' alt='Cup Icon' height={24} width={24} />
            </h2>
            <ul className="space-y-4">
              <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
                <strong className="text-lg text-gray-800">1st</strong>
                <div className="flex items-center text-lg font-medium text-gray-900">
                  5000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
                </div>
              </li>
              <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
                <strong className="text-lg text-gray-800">2nd</strong>
                <div className="flex items-center text-lg font-medium text-gray-900">
                  3000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
                </div>
              </li>
              <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
                <strong className="text-lg text-gray-800">3rd</strong>
                <div className="flex items-center text-lg font-medium text-gray-900">
                  2000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
                </div>
              </li>
              <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
                <strong className="text-lg text-gray-800">4th-10th</strong>
                <div className="flex items-center text-lg font-medium text-gray-900">
                  1000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
                </div>
              </li>
              <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
                <strong className="text-lg text-gray-800">11th-100th</strong>
                <div className="flex items-center text-lg font-medium text-gray-900">
                  500 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer className="mt-20 py-10 bg-black text-gray-200 text-center">
        <p className="text-sm">© 2025 Developed by @<Link href='/about' className="font-semibold hover:underline">Samarth</Link>. All rights reserved.</p>
      </footer>
      {authModal.isOpen && <AuthModal />}
    </div>
  );
};

export default Preview;
