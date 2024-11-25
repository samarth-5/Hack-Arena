import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Navbar from '@/Components/Navbar';
import React from 'react'
import { useRecoilValue } from 'recoil';

type Props = {}

export default function ContestsPage({}: Props) {

  const authModal = useRecoilValue(authModalState);
  
  return (
    <main>
        <Navbar />
        Contests Page
        {authModal.isOpen && <AuthModal />}
      </main>
  )
}