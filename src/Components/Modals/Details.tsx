import { contestDetailsModalState } from '@/Atoms/contestDetailsModal';
import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5';
import { useSetRecoilState } from 'recoil';

type Props = {}

export default function Details({}: Props) {

  const closeModal = useCloseModal();
  
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}></div>
      
            <div className="w-full sm:w-[450px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center">
              <div className="relative w-full h-full mx-auto flex items-center justify-center">
                <div className="bg-gradient-to-b from-gray-800 to-black rounded-xl shadow-lg border border-gray-700 relative w-full mx-6 p-6">
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-transparent rounded-full text-gray-400 p-2 hover:bg-gray-700 hover:text-white"
                      onClick={closeModal}>
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
      
                  
                </div>
              </div>
            </div>
    </div>
  )
}

function useCloseModal() {
	const setDetailsModalState=useSetRecoilState(contestDetailsModalState);

	const closeModal = () => {
		setDetailsModalState((prev) => ({ ...prev, isOpen: false }));
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, []);

	return closeModal;
}