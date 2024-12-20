import ContestQuestions from '@/Components/ContestQuestions';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

type Props = {}

export default function preview({}: Props) {

  const router = useRouter();
  const { title } = router.query;

  const [loadingProblems, setLoadingProblems] = useState(true);
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Contest Preview</h1>
      {title ? (
        <>
          <p className="text-lg mb-4">Welcome to <strong>{title}</strong></p>
          <p className="text-lg">You are previewing the contest: <strong>{title}</strong></p>
        </>
      ) : (
        <p className="text-lg">Loading...</p>
      )}

      <table className="w-full text-sm text-left text-gray-800 sm:w-10/12 max-w-[1200px] mx-auto bg-white shadow-lg rounded-xl mt-6">
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
  )
}