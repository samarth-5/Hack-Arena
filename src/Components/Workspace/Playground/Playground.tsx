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
        <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
				<div className='w-full overflow-auto'>
					<CodeMirror
						value="Hello World"
						theme={noctisLilac}
						extensions={[javascript()]}
						style={{ fontSize: 16 }}
					/>
				</div>
				<div className='w-full px-5 overflow-auto'>
          testcase
          </div>
        </Split>
    </div>
  )
}