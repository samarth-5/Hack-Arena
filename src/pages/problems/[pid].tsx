import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Topbar from '@/Components/Topbar';
import Workspace from '@/Components/Workspace/Workspace';
import { problems } from '@/Utils/problems';
import { Problem } from '@/Utils/types/problem';
import React from 'react'
import { useRecoilValue } from 'recoil';

type Props = {
  problem: Problem
}

export default function QuestionPage({problem}: Props) {

  console.log(problem);

  const authModal = useRecoilValue(authModalState);
    
  return (
    <>
        <Topbar problemPage />
        <Workspace problem={problem} />
        {authModal.isOpen && <AuthModal />}
    </>
  )
}

//Static Site Generation (SSG)
// getStaticPaths => it create the dynamic routes
export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}