import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Topbar from '@/Components/Topbar';
import Workspace from '@/Components/Workspace/Workspace';
import React from 'react'
import { useRecoilValue } from 'recoil';

type Props = {}

export default function QuestionPage({}: Props) {

  const authModal = useRecoilValue(authModalState);
    
  return (
    <>
        <Topbar problemPage />
        <Workspace />
        {authModal.isOpen && <AuthModal />}
    </>
  )
}