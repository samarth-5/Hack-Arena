import { problems } from '@/pages/problems/problems';
import Link from 'next/link';
import React from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FaGoogle, FaFacebook, FaAmazon, FaApple, FaMicrosoft, FaLinkedin, FaSnapchat } from 'react-icons/fa';
import { SiAdobe, SiUber } from "react-icons/si";

type Props = {};

export default function ProblemsTable({}: Props) {

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
            <th className="px-6 py-4 font-medium">
              <BsCheckCircle className='text-green-500' fontSize={"18"} width='18' />
            </th>
            <td className="px-6 py-4">
              
            <Link
										className='hover:text-blue-600 cursor-pointer'
										href={`/problems/${problem.id}`}
									>
										{problem.title}
									</Link>

                
            </td>
            <td className={`px-6 py-4 ${difficultyColor} font-semibold`}>
              {problem.difficulty}
            </td>
            <td className="px-6 py-4 text-black">{problem.category}</td>
            <td className="px-6 py-4 text-gray-700">
              <div className='flex gap-3'>
                {renderCompanies(problem.companies)}
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
