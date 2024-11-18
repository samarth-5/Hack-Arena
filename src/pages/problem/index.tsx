import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Topbar from '@/Components/Topbar';
import React from 'react'
import { useRecoilValue } from 'recoil';

type Props = {}

export default function QuestionPage({}: Props) {

  const authModal = useRecoilValue(authModalState);
    
  return (
    <>
        <Topbar problemPage />
        Problem Q Page
        {authModal.isOpen && <AuthModal />}
    </>
  )
}