import { auth, firestore } from '@/firebase/firebase';
import { DBProblem, Problem } from '@/Utils/types/problem';
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { AiFillDislike, AiFillLike, AiFillStar, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { TiStarOutline } from 'react-icons/ti';
import CircleSkeleton from "@/Components/Skeletons/CircleSkeleton";
import RectangleSkeleton from "@/Components/Skeletons/RectangleSkeleton";
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';


type Props = {
  problem: Problem
  _solved: boolean
}

export default function ProblemDesc({problem, _solved}: Props) {
  const [user] = useAuthState(auth);
  const { currentProblem, loading, problemDifficultyClass, setCurrentProblem } = useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, setData, starred } = useGetUsersDataOnProblem(problem.id);
  const [updating, setUpdating] = useState(false);

    const handleLike = async () => {
	if (!user) {
		toast.error("You must be Logged in to like a problem !", { position: "top-center", theme: "dark" });
		return;
	}

    if (updating) return;
		setUpdating(true);

    await runTransaction(firestore, async (transaction) => {
		const userRef = doc(firestore, "users", user!.uid);
	    const problemRef = doc(firestore, "problems", problem.id);
	  	const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);

		if (userDoc.exists() && problemDoc.exists()) {
			if (liked) {
			// remove problem id from likedProblems on user document, decrement likes on problem document
				transaction.update(userRef, {
				likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
			});
			transaction.update(problemRef, {
				likes: problemDoc.data().likes - 1,
			});

			setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
			setData((prev) => ({ ...prev, liked: false }));
		} 
        else if (disliked) {
			transaction.update(userRef, {
			likedProblems: [...userDoc.data().likedProblems, problem.id],
			dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
		});
		transaction.update(problemRef, {
			likes: problemDoc.data().likes + 1,
			dislikes: problemDoc.data().dislikes - 1,
		});
        setCurrentProblem((prev) =>
			prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
		);
			setData((prev) => ({ ...prev, liked: true, disliked: false }));
		} 
        else {
			transaction.update(userRef, {
			likedProblems: [...userDoc.data().likedProblems, problem.id],
		});
		transaction.update(problemRef, {
		likes: problemDoc.data().likes + 1,
      });
	    setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
	    setData((prev) => ({ ...prev, liked: true }));
	    }
      }
    });
    setUpdating(false); 
  }

  const handleDislike = async () => {
		if (!user) {
			toast.error("You must be Logged in to dislike a problem !", { position: "top-center", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const userRef = doc(firestore, "users", user!.uid);
		  const problemRef = doc(firestore, "problems", problem.id);
		  const userDoc = await transaction.get(userRef);
		  const problemDoc = await transaction.get(problemRef);
			if (userDoc.exists() && problemDoc.exists()) {
				// already disliked, already liked, not disliked or liked
				if (disliked) {
					transaction.update(userRef, {
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, disliked: false }));
				} else if (liked) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, disliked: true, liked: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, disliked: true }));
				}
			}
		});
		setUpdating(false);
	};

  const handleStar = async () => {
		if (!user) {
			toast.error("You must be Logged in to star a problem !", { position: "top-center", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);

		if (!starred) {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayUnion(problem.id),
			});
			setData((prev) => ({ ...prev, starred: true }));
		} else {
			const userRef = doc(firestore, "users", user.uid);
			await updateDoc(userRef, {
				starredProblems: arrayRemove(problem.id),
			});
			setData((prev) => ({ ...prev, starred: false }));
		}

		setUpdating(false);
	};

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
            
            {loading && (
							<div className='mt-3 flex space-x-2'>
								<RectangleSkeleton />
								<CircleSkeleton />
								<RectangleSkeleton />
								<RectangleSkeleton />
								<CircleSkeleton />
							</div>
						)}
            
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
              <div className={`${problemDifficultyClass} inline-block rounded-[21px] px-2.5 py-1 text-xs font-medium capitalize`}>
                {currentProblem.difficulty}
              </div>

              {(solved || _solved) && (
									<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s'>
										<BsCheck2Circle />
									</div>
								)}

              <div onClick={handleLike} className="flex items-center cursor-pointer hover:bg-gray-200 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600 hover:text-gray-800">
                  {liked && !updating && <AiFillLike className='text-dark-blue-s' />}
									{!liked && !updating && <AiFillLike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
                <span className="text-xs">{currentProblem.likes}</span>
              </div>

              <div onClick={handleDislike} className="flex items-center cursor-pointer hover:bg-gray-200 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-600 hover:text-gray-800">
                  {disliked && !updating && <AiFillDislike className='text-dark-blue-s' />}
									{!disliked && !updating && <AiFillDislike />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
                <span className="text-xs">{currentProblem.dislikes}</span>
              </div>

              <div onClick={handleStar} className="cursor-pointer hover:bg-gray-200 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-gray-600 hover:text-gray-800">
                  {starred && !updating && <AiFillStar className='text-dark-yellow' />}
									{!starred && !updating && <TiStarOutline />}
									{updating && <AiOutlineLoading3Quarters className='animate-spin' />}
              </div>
              </div>)
            }

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

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

	useEffect(() => {
		const getCurrentProblem = async () => {
			setLoading(true);
			const docRef = doc(firestore, "problems", problemId);

			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const problem = docSnap.data();
				setCurrentProblem({ id: docSnap.id, ...problem } as DBProblem);
				// easy, medium, hard
				setProblemDifficultyClass(
					problem.difficulty === "Easy"
						? "bg-olive text-white"
						: (problem.difficulty === "Medium"
						? "bg-dark-yellow text-white"
						: "bg-dark-pink text-white")
				);
			}
			setLoading(false);
		};
		getCurrentProblem();
	}, [problemId]);

	return { currentProblem, loading, problemDifficultyClass, setCurrentProblem };
}

function useGetUsersDataOnProblem(problemId: string) {
	const [data, setData] = useState({ liked: false, disliked: false, starred: false, solved: false });
	const [user] = useAuthState(auth);

	useEffect(() => {
		const getUsersDataOnProblem = async () => {
			const userRef = doc(firestore, "users", user!.uid);
			const userSnap = await getDoc(userRef);
			if (userSnap.exists()) {
				const data = userSnap.data();
				const { solvedProblems, likedProblems, dislikedProblems, starredProblems } = data;
				setData({
					liked: likedProblems.includes(problemId), 
					disliked: dislikedProblems.includes(problemId),
					starred: starredProblems.includes(problemId),
					solved: solvedProblems.includes(problemId),
				});
			}
		};

		if (user) 
    getUsersDataOnProblem();
		return () => setData({ liked: false, disliked: false, starred: false, solved: false });
	}, [problemId, user]);

	return { ...data, setData };
}