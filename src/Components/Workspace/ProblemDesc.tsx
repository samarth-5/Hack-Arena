import { Problem } from '@/Utils/types/problem';
import React from 'react'
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';

type Props = {
  problem: Problem
}

export default function ProblemDesc({problem}: Props) {
  return (
    <div className="bg-white"> 
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-gray-900 text-white overflow-x-hidden">
        <div className="font-medium bg-white rounded-t-xl px-5 py-[10px] text-xs cursor-pointer text-black hover:bg-gray-200">
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto"> {/* Enable scrolling for content only */}
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-gray-900 font-medium">{problem?.title}</div>
            </div>
            <div className="flex items-center mt-3">
              <div className="text-gray-600 bg-gray-100 inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize">
                Easy
              </div>
              <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-600 hover:text-green-800">
                <BsCheck2Circle />
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-200 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600 hover:text-gray-800">
                <AiFillLike />
                <span className="text-xs">120</span>
              </div>
              <div className="flex items-center cursor-pointer hover:bg-gray-200 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600 hover:text-gray-800">
                <AiFillDislike />
                <span className="text-xs">2</span>
              </div>
              <div className="cursor-pointer hover:bg-gray-200 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-gray-600 hover:text-gray-800">
                <TiStarOutline />
              </div>
            </div>

            {/* Problem Statement(paragraphs) */}
            <div className="text-gray-900 text-sm">
              <div dangerouslySetInnerHTML={{__html: problem.problemStatement}} />
            </div>

            <div className="mt-4 flex flex-col items-start">
              {problem.examples.map((example, index) => (
                <div key={example.id} className="mb-6 w-full">
                  {/* Example Header */}
                  <p className="font-bold text-black bg-white py-2 rounded-t-md">
                    Example {index + 1}
                  </p>

                  {/* Optional Example Image */}
                  {example.img && (
                    <img
                      src={example.img}
                      alt={`Example ${index + 1}`}
                      className="rounded-md mb-4 shadow-lg"
                    />
                  )}

                  {/* Example Content Card */}
                  <div className="example-card bg-white text-black p-4 rounded-b-md shadow-md border border-black">
                    <pre className="text-sm">
                      <strong>Input:</strong> {example.inputText}
                      <br />
                      <strong>Output:</strong> {example.outputText}
                      <br />
                      {example.explanation && (
                        <>
                          <strong>Explanation:</strong> {example.explanation}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              ))}
            </div>


            {/* Constraints */}
            {/* Constraints */}
            <div className='my-8 pb-4'>
              <div className='text-black text-sm font-medium'>Constraints:</div>
              <ul className='text-black ml-5 list-disc'>
                <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
