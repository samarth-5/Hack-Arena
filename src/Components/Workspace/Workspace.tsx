import { useEffect } from 'react';
import Split from 'react-split';
import ProblemDesc from './ProblemDesc';
import Playground from './Playground/Playground';
import { Problem } from '@/pages/problems/problems';

type Props = {
  problem: Problem
};

export default function Workspace({problem}: Props) {
  // useEffect(() => {
  //   // Disable scrolling when on the Workspace page
  //   document.body.style.overflow = 'hidden';

  //   // Re-enable scrolling when leaving the page
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, []);

  return (
    <>
      <div className="border-t-2 border-black"></div>
      <Split className="split" minSize={0}>
        <ProblemDesc problem={problem} />
        <Playground />
      </Split>
    </>
  );
}
