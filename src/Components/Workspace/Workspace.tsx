import { useEffect } from 'react';
import Split from 'react-split';
import ProblemDesc from './ProblemDesc';
import Playground from './Playground/Playground';
import { Problem } from '@/Utils/types/problem';

type Props = {
  problem: Problem
};

export default function Workspace({problem}: Props) {

  return (
      <Split className="split" minSize={0}>
        <ProblemDesc problem={problem} />
        <Playground problem={problem} />
      </Split>
  );
}
