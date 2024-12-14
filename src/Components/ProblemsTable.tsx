import { firestore } from '@/firebase/firebase';
import { problems } from '@/pages/problems/problems';
import { DBProblem } from '@/Utils/types/problem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FaGoogle, FaFacebook, FaAmazon, FaApple, FaMicrosoft, FaLinkedin, FaSnapchat } from 'react-icons/fa';
import { SiAdobe, SiUber } from "react-icons/si";

type Props = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProblemsTable({ setLoadingProblems }: Props) {

    const problems = useGetProblems(setLoadingProblems);

    const iconMap: Record<string, JSX.Element> = {
        FaGoogle: <FaGoogle size={20} />,
        FaFacebook: <FaFacebook size={20} />,
        FaAmazon: <FaAmazon size={20} />,
        FaApple: <FaApple size={20} />,
        FaMicrosoft: <FaMicrosoft size={20} />,
        FaLinkedin: <FaLinkedin size={20} />,
        FaUber: <SiUber size={20} />,
        FaSnapchat: <FaSnapchat size={20} />,
        FaAdb: <SiAdobe size={20} />,
      };

      const renderCompanies = (companies: string[]) => {
        return companies.map((iconName, index) => (
          <div key={index}>
            {iconMap[iconName]} {/* Render the icon corresponding to the iconName */}
          </div>
        ));
      };

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
          <tr
            className={`${
              idx % 2 === 1 ? 'bg-gray-200' : 'bg-white'
            } hover:bg-gray-300 transition-all duration-300`}
            key={problem.id}
          >
            <th className="px-6 py-3 font-medium">
              <BsCheckCircle className='text-green-500' fontSize={"18"} width='18' />
            </th>
            <td className="px-6 py-3">
                  {problem.link ? (
									<Link
										href={problem.link}
										className='hover:text-blue-600 cursor-pointer text-[15px] font-semibold'
										target='_blank'
									>
										{problem.title}
									</Link>
								) : (
									<Link
										className='hover:text-blue-600 cursor-pointer text-[15px] font-semibold'
										href={`/problems/${problem.id}`}
									>
										{problem.title}
									</Link>
								)}
            </td>

            <td className={`px-6 py-3 ${difficultyColor} font-semibold`}>
              {problem.difficulty}
            </td>
            <td className="px-6 py-3 font-medium text-[13px] text-black">{problem.category}</td>
            <td className="px-6 py-3 text-gray-700">
              <div className='flex gap-3'>
                {/* {renderCompanies(problem.companies)} */}
              </div>
            </td>
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
			// fetching data logic
			setLoadingProblems(true);
			const q = query(collection(firestore, "problems"), orderBy("order", "asc"));
			const querySnapshot = await getDocs(q);
			const tmp: DBProblem[] = [];
			querySnapshot.forEach((doc) => {
				tmp.push({ id: doc.id, ...doc.data() } as DBProblem);
			});
      //console.log(tmp);
			setProblems(tmp);
			setLoadingProblems(false);
		};

		getProblems();
	}, [setLoadingProblems]);
	return problems;
}