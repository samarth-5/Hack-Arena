import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Navbar from '@/Components/Navbar';
import ProblemsTable from '@/Components/ProblemsTable';
import React from 'react';
import { useRecoilValue } from 'recoil';

type Props = {};

export default function ProblemsPage({}: Props) {
  const authModal = useRecoilValue(authModalState);

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-center text-gray-900 font-semibold mt-10 mb-6 uppercase">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 
      </h1>

      <div className="relative overflow-x-auto mx-auto px-4 sm:px-6 pb-10">
        <table className="w-full text-sm text-left text-gray-800 sm:w-10/12 max-w-[1200px] mx-auto bg-white shadow-lg rounded-xl">
          <thead className="text-s text-black-900 uppercase border-b bg-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-left">Status</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Title</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Difficulty</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Category</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Solution</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>

      {authModal.isOpen && <AuthModal />}
    </>
  );
}
