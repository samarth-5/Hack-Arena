import React, { useState } from 'react'
import PreferenceNav from './PreferenceNav'
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror";
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { javascript } from '@codemirror/lang-javascript';
import EditorFooter from './EditorFooter';
import { Problem } from '@/Utils/types/problem';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/firebase';
import { toast } from 'react-toastify';
import { problems } from "@/Utils/problems";
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type Props = {
  problem: Problem
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Playground({problem, setSuccess, setSolved}: Props) {
  
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [user] = useAuthState(auth);

  const handleSubmit = async()=>{
    if (!user) {
			toast.error("Please Login to submit your code!", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}
    try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 3000,
						theme: "dark",
					});
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
          setSolved(true);
				}
			}
		} 
    catch (error: any) {
			console.log(error.message);
			if (
				error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values")
			) {
				toast.error("Oops! One or more test cases failed !", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} 
      else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
    //alert("Submit");
  }

  const {query: { pid }} = useRouter();

  const handleChange = (value: string) => {
    console.log(value);
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};


  return (
    <div className='flex flex-col bg-white relative overflow-x-hidden'>
        <PreferenceNav />
        <Split className='h-full' direction='vertical' sizes={[50, 50]} minSize={60}>
				  <div className='w-full overflow-auto'>
					  <CodeMirror
						  value={problem.starterCode}
				  		theme={noctisLilac}
					  	extensions={[javascript()]}
						  style={{ fontSize: 16 }}
              onChange={handleChange}
				  	/>
		  		</div>
			  	<div className='w-full px-5 overflow-auto'>
            <div className='flex h-10 items-center space-x-6'>
						  <div className='relative flex h-full flex-col justify-center cursor-pointer'>
							  <div className='text-sm font-medium leading-5 text-black'>Testcases</div>
							  <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black' />
						  </div>
					  </div>

          <div className='flex'>
						{problem.examples.map((example, index) => (
							<div
								className='mr-2 items-start mt-2 '
								key={example.id} onClick={() => setActiveTestCaseId(index)}>
								<div className='flex flex-wrap items-center gap-y-4'>
                <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-gradient-to-b from-gray-900 to-black 
                                hover:from-gray-800 hover:to-black text-white rounded-full px-4 py-1 cursor-pointer whitespace-nowrap shadow-md">
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

          <div className="font-semibold my-4">
  {/* Input Section */}
            <p className="text-sm font-medium mt-4 text-black">Input:</p>
            <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>

  {/* Output Section */}
              <p className="text-sm font-medium mt-4 text-black">Output:</p>
              <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
                {problem.examples[activeTestCaseId].outputText}
              </div>
            </div>
          </div>
        </Split>

        <EditorFooter handleSubmit={handleSubmit} />
    </div>
  )
}