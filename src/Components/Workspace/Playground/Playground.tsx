import React, { useEffect, useState } from 'react'
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
import useLocalStorage from '@/hooks/useLocalStorage';

type Props = {
  problem: Problem
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISettings {
  fontSize: string;
  settingsModalIsOpen: boolean;
  dropdownIsOpen: boolean;
}

export default function Playground({problem, setSuccess, setSolved}: Props) {
  
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  const [userCode, setUserCode] = useState<string>(problem.starterCode);

  const [user] = useAuthState(auth);

  const [fontSize] = useLocalStorage("lcc-fontSize", "16px");

  const [settings, setSettings] = useState<ISettings>({
      fontSize: fontSize,
      settingsModalIsOpen: false,
      dropdownIsOpen: false,
    });

  const { query: { pid } } = useRouter();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please Login to submit your code!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    try {
      if (!pid) {
        throw new Error('Problem ID not found');
      }

      const trimmedCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${trimmedCode}`)();
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message.startsWith("AssertionError [ERR_ASSERTION]: Expected values")) {
          toast.error("Oops! One or more test cases failed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        } else {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      }
    }
  }

  const handleChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode]);

  return (
    <div className='flex flex-col bg-white relative overflow-x-hidden'>
        <PreferenceNav settings={settings} setSettings={setSettings} />
        <Split className='h-full' direction='vertical' sizes={[50, 50]} minSize={60}>
          <div className='w-full overflow-auto'>
            <CodeMirror
              value={userCode}
              theme={noctisLilac}
              extensions={[javascript()]}
              style={{ fontSize: settings.fontSize }}
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
                  className='mr-2 items-start mt-2'
                  key={example.id}
                  onClick={() => setActiveTestCaseId(index)}>
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
              <p className="text-sm font-medium mt-4 text-black">Input:</p>
              <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
                {problem.examples[activeTestCaseId]?.inputText}
              </div>

              <p className="text-sm font-medium mt-4 text-black">Output:</p>
              <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
                {problem.examples[activeTestCaseId]?.outputText}
              </div>
            </div>
          </div>
        </Split>

        <EditorFooter handleSubmit={handleSubmit} />
    </div>
  )
}