import Navbar from "@/Components/Navbar";
import { useRecoilValue } from "recoil";
import { authModalState } from "@/Atoms/authModalAtom";
import AuthModal from "@/Components/Modals/AuthModal";
import Image from "next/image";
import Link from "next/link";
import useHasMounted from "@/hooks/useHasMounted";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { toast } from "react-toastify";

export default function Home() {
  const authModal = useRecoilValue(authModalState);
  const [user] = useAuthState(auth);

  const hasMounted = useHasMounted();

  if(!hasMounted)
  return null;

  const handleClick = () => {
      if(!user)
      {
        toast.error("Sign in to start practicing !", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
        return;
      }
    }

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      <section className="mx-20 mt-10 px-20 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          The Most Effective Way to Get Into
        </h2>
        <Image
          src="/maang.png" 
          alt="MAANG banner"
          width={400}
          height={150}
          className="mx-auto"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 mt-8">
          Achieve Your Dream Job with Confidence
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Unlock your potential by solving problems that mirror real-world challenges at top companies like Meta, Amazon, Apple, Netflix, and Google. 
          Practice consistently, boost your confidence, and prepare to ace technical interviews.
        </p>
        {
          user && 
          (<Link href="/problems">
            <button className="mt-6 px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">
              Start Practicing Now
            </button>
          </Link>)
        }
        {
          !user &&
          (<button onClick={handleClick} className="cursor-not-allowed mt-6 px-8 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition">
              Start Practicing Now
            </button>)       
        }
      </section>

      <section className="px-20 mx-20 mt-16">
        <Image
          src="/coding.png"
          alt="Coding Team Collaboration"
          width={800}
          height={400}
          className="rounded-lg mx-auto"
        />
        <h2 className="text-2xl font-semibold mt-6 text-center text-gray-800">
          Build Skills, Build Confidence
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Join a community of ambitious coders just like you. Tackle coding problems, compete with peers, and grow your expertise every day. 
          Whether you're preparing for interviews or sharpening your problem-solving skills, we've got you covered.
        </p>
        <p className="mt-4 text-center text-lg text-gray-600">
          Push your limits, learn from failures, and celebrate wins. This is your journey to greatness—one line of code at a time.
        </p>
      </section>

      <footer className="mt-20 py-10 bg-black text-gray-200 text-center">
        <p className="text-sm">© 2025 Developed by @<Link href='/about' className="font-semibold hover:underline">Samarth</Link>. All rights reserved.</p>
      </footer>

      {authModal.isOpen && <AuthModal />}
    </main>
  );
}
