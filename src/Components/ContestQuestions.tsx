import { auth, firestore } from '@/firebase/firebase';
import { DBProblem } from '@/Utils/types/problem';
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsCheckCircle } from 'react-icons/bs';

type Props = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContestQuestions({ setLoadingProblems }: Props) {

    const problems = useGetProblems(setLoadingProblems);
    const solvedProblems = useGetSolvedProblems();
    console.log(solvedProblems);

    const points=[200,800,400,200,400];

  return (
    <tbody>
      {problems.map((problem, idx) => {
        const difficultyColor =
          problem.difficulty === 'Easy'
            ? 'text-green-500'
            : problem.difficulty === 'Medium'
            ? 'text-yellow-400'
            : 'text-red-500';

        return (
          <tr className={`${
              idx % 2 === 1 ? 'bg-gray-200' : 'bg-white'
            } hover:bg-gray-300 transition-all duration-300`}
            key={problem.id} >
            <td className="px-6 py-3">
              {problem.link ? (
                <Link href={problem.link}
                  className="hover:text-blue-600 cursor-pointer text-[15px] font-semibold"
                  target="_blank">
                  {problem.title}
                </Link>
              ) : (
                <Link className="hover:text-blue-600 cursor-pointer text-[15px] font-semibold"
                  href={`/problems/${problem.id}`}>
                  {problem.title}
                </Link>
              )}
            </td>
    
            <td className={`px-6 py-3 ${difficultyColor} font-semibold`}>
              {problem.difficulty}
            </td>
            <td className="px-6 py-3 font-semibold pl-16">
              {points[idx]} 
            </td>
            <th className="px-6 py-3 font-medium">
              {solvedProblems.includes(problem.id) && (
                <BsCheckCircle className="text-green-500" fontSize={"18"} width="18" />
              )}
            </th>
          </tr>
        );
      })}
    </tbody>
  );
}

function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
	const [problems, setProblems] = useState<DBProblem[]>([]);

	useEffect(() => {
		const getProblems = async () => {
			setLoadingProblems(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp: DBProblem[] = [];
			querySnapshot.docs.slice(0, 5).forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
			setProblems(tmp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}

function useGetSolvedProblems() {
	const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getSolvedProblems = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userDoc = await getDoc(userRef);

			if (userDoc.exists()) {
				setSolvedProblems(userDoc.data().solvedProblems);
			}
		};

		if (user) getSolvedProblems();
		if (!user) setSolvedProblems([]);
	}, [user]);

	return solvedProblems;
}