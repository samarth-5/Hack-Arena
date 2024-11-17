import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal'
import Navbar from '@/Components/Navbar'
import React from 'react'
import { useRecoilValue } from 'recoil';

type Props = {}

export default function ProblemsPage({}: Props) {

  const authModal = useRecoilValue(authModalState);
  
  return (
    <>
      <Navbar />
      Problems Page
      {authModal.isOpen && <AuthModal />}
    </>
  )
}