import ContestQuestions from '@/Components/ContestQuestions';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from "next/image";

type Props = {};

export default function preview({}: Props) {
  const router = useRouter();
  const { title } = router.query;

  const [loadingProblems, setLoadingProblems] = useState(true);

  return (
    <div className="p-6 mx-20">
      <h1 className="text-3xl font-bold mb-4">Contest Preview</h1>
      {title ? (
        <>
          <p className="text-lg mb-4">Welcome to <strong>{title}</strong></p>
          <p className="text-lg">You are previewing the contest: <strong>{title}</strong></p>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}

      <div className="flex flex-col lg:flex-row mt-6">
        <div className="lg:w-3/4">
          <table className="w-full text-sm text-left text-gray-800 sm:w-10/12 max-w-[1200px] bg-white shadow-lg rounded-xl">
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
        </div>

        <div className="lg:w-1/4 bg-white shadow-lg rounded-2xl p-6 border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Prizes <Image src='/cup.png' alt='Cup Icon' height={24} width={24} />
          </h2>
          <ul className="space-y-4">
            <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
              <strong className="text-lg text-gray-800">1st</strong> 
              <div className='flex items-center text-lg font-medium text-gray-900'>
                5000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
              </div>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
              <strong className="text-lg text-gray-800">2nd</strong> 
              <div className='flex items-center text-lg font-medium text-gray-900'>
                3000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
              </div>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
              <strong className="text-lg text-gray-800">3rd</strong> 
              <div className='flex items-center text-lg font-medium text-gray-900'>
                2000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
              </div>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
              <strong className="text-lg text-gray-800">4th-10th</strong> 
              <div className='flex items-center text-lg font-medium text-gray-900'>
                1000 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
              </div>
            </li>
            <li className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm flex justify-between items-center">
              <strong className="text-lg text-gray-800">11th-100th</strong> 
              <div className='flex items-center text-lg font-medium text-gray-900'>
                500 <Image src='/coin.png' alt='Coin Icon' height={20} width={20} />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
