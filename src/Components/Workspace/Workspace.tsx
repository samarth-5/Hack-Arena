import { useEffect, useState } from 'react';
import Split from 'react-split';
import ProblemDesc from './ProblemDesc';
import Playground from './Playground/Playground';
import { Problem } from '@/Utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/hooks/useWindowSize';
import { createPortal } from 'react-dom';

type Props = {
  problem: Problem;
};

export default function Workspace({ problem }: Props) {
  const { width, height } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  const [success, setSuccess] = useState(false);
  const [solved,setSolved] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures the component knows it's running on the client side
  }, []);

  return (
    <>
      <Split className="split" minSize={0}>
        <ProblemDesc problem={problem} _solved={solved} />
        <Playground problem={problem} setSuccess={setSuccess} setSolved={setSolved} />
      </Split>
      {success && isClient &&
        createPortal(
          <Confetti gravity={0.3} tweenDuration={4000} width={width} height={height} />,
          document.body
        )}
    </>
  );
}
