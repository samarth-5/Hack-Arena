import React from 'react'
import PreferenceNav from './PreferenceNav'
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror";
import { noctisLilac } from '@uiw/codemirror-theme-noctis-lilac';
import { javascript } from '@codemirror/lang-javascript';

type Props = {}

export default function Playground({}: Props) {
  return (
    <div className='flex flex-col bg-white relative overflow-x-hidden'>
        <PreferenceNav />
        <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[50, 50]} minSize={60}>
				  <div className='w-full overflow-auto'>
					  <CodeMirror
						  value="Hello World"
				  		theme={noctisLilac}
					  	extensions={[javascript()]}
						  style={{ fontSize: 16 }}
				  	/>
		  		</div>
			  	<div className='w-full px-5 overflow-auto'>
            <div className='flex h-10 items-center space-x-6'>
						  <div className='relative flex h-full flex-col justify-center cursor-pointer'>
							  <div className='text-sm font-medium leading-5 text-black'>Testcases</div>
							  <hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-black' />
						  </div>
					  </div>

            <div className="flex">
  {/* Case 1 */}
  <div className="mr-2 items-start mt-2">
    <div className="flex flex-wrap items-center gap-y-4">
      <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-gradient-to-b from-gray-900 to-black 
        hover:from-gray-800 hover:to-black text-white rounded-full px-4 py-1 cursor-pointer whitespace-nowrap shadow-md">
        Case 1
      </div>
    </div>
  </div>

  {/* Case 2 */}
  <div className="mr-2 items-start mt-2">
    <div className="flex flex-wrap items-center gap-y-4">
      <div className="font-medium items-center transition-all focus:outline-none inline-flex bg-gradient-to-b from-gray-900 to-black 
        hover:from-gray-800 hover:to-black text-white rounded-full px-4 py-1 cursor-pointer whitespace-nowrap shadow-md">
        Case 2
      </div>
    </div>
  </div>
</div>

<div className="font-semibold my-4">
  {/* Input Section */}
  <p className="text-sm font-medium mt-4 text-black">Input:</p>
  <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
    nums: [2,7,1,,15] , target: 9
  </div>

  {/* Output Section */}
  <p className="text-sm font-medium mt-4 text-black">Output:</p>
  <div className="w-full cursor-text rounded-full border px-3 py-[10px] bg-gradient-to-b from-gray-800 to-black text-white shadow-inner mt-2">
    [0,1]
  </div>
</div>
</div>
        </Split>
    </div>
  )
}