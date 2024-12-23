import { contestDetailsModalState } from '@/Atoms/contestDetailsModal';
import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

export default function Details() {
  const closeModal = useCloseModal();

  return (
    <div>
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-75"
        onClick={closeModal}></div>

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full sm:w-[550px]">
        <div className="relative w-full h-full mx-auto flex items-center justify-center">
          <div className="bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-lg border border-gray-700 relative w-full mx-6 p-6 text-white">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-transparent rounded-full text-gray-400 p-2 hover:bg-gray-700 hover:text-white"
                onClick={closeModal}>
                <IoClose className="h-6 w-6" />
              </button>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Hacker&apos;s Arena</h1>
              <h2 className="text-xl font-semibold mb-2">Welcome to the 429th Hacker&apos;s Arena Weekly Contest</h2>
              <p className="text-gray-300 mb-4">
                This Hacker&apos;s Arena contest is sponsored by Hacker&apos;s Arena.
              </p>

              <div className="bg-gray-700 p-4 rounded-md text-left">
                <h3 className="text-lg font-semibold mb-2">⭐ Bonus Prizes ⭐</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Contestants ranked 1st ~ 3rd will win a Hacker&apos;s Arena Backpack</li>
                  <li>Contestants ranked 4th ~ 10th will win a Hacker&apos;s Arena Water Bottle</li>
                  <li>Contestants ranked 11th ~ 16th will win a Hacker&apos;s Arena Big O Notebook</li>
                </ul>
                <p className="text-gray-400 mt-4 text-sm">
                  Only Hacker&apos;s Arena accounts are eligible for the bonus rewards. After the ranking is finalized, a
                  Hacker&apos;s Arena team member will reach out to you through email regarding the gift!
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => alert('Contest Started!')}>
                Participate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function useCloseModal() {
  const setDetailsModalState = useSetRecoilState(contestDetailsModalState);

  const closeModal = () => {
    setDetailsModalState((prev) => ({ ...prev, isOpen: false }));
    document.body.classList.remove('modal-open');
  };

  useEffect(() => {
    document.body.classList.add('modal-open');

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.classList.remove('modal-open');
    };
  }, []);

  return closeModal;
}
