import React from "react";
import { authModalState } from "@/Atoms/authModalAtom";
import AuthModal from "@/Components/Modals/AuthModal";
import Navbar from "@/Components/Navbar";
import ContestCard from "@/Components/ContestCard";
import { useRecoilValue } from "recoil";
import Link from "next/link";
import useHasMounted from "@/hooks/useHasMounted";
import { contestDetailsModalState } from "@/Atoms/contestDetailsModal";
import Details from "@/Components/Modals/Details";


export default function ContestsPage() {
  const contestDetailsModal = useRecoilValue(contestDetailsModalState);
  console.log(contestDetailsModal);
  const authModal = useRecoilValue(authModalState);
  const hasMounted = useHasMounted();

  if(!hasMounted)
  return null;

  const upcomingContests = [
    {
      title: "DSA Sprint 3.0",
      endDate: new Date("2024-12-31T23:59:59"),
      image: "/contest.jpeg",
    },
    {
      title: "DSA Mastery 2.0",
      endDate: new Date("2025-01-15T23:59:59"),
      image: "/contest.jpeg",
    },
  ];

  const ongoingContests = [
    {
      title: "DSA Sprint 1.0",
      endDate: new Date("2024-12-31T23:59:59"),
      image: "/contest.jpeg",
    },
    {
      title: "DSA Sprint 2.0",
      endDate: new Date("2025-01-15T23:59:59"),
      image: "/contest.jpeg",
    },
    {
      title: "DSA Mastery 1.0",
      endDate: new Date("2024-12-20T23:59:59"),
      image: "/contest.jpeg",
    },
  ];

  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />

      <div className="contests px-24 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 uppercase tracking-widest text-gray-800">
          Contests
        </h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2 text-gray-700">
            Ongoing Contests
          </h2>
          <div className="flex flex-wrap gap-6">
            {ongoingContests.map((contest, index) => (
              <ContestCard
                key={index}
                title={contest.title}
                endDate={contest.endDate}
                image={contest.image}
                actionLabel="Start"
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2 text-gray-700">
            Upcoming Contests
          </h2>
          <div className="flex flex-wrap gap-8">
            {upcomingContests.map((contest, index) => (
              <ContestCard
                key={index}
                title={contest.title}
                endDate={contest.endDate}
                image={contest.image}
                actionLabel="Register"
              />
            ))}
          </div>
        </section>
      </div>
      <footer className="mt-20 py-10 bg-black text-gray-200 text-center">
        <p className="text-sm">© 2025 Developed by @<Link href='/about' className="font-semibold hover:underline">Samarth</Link>. All rights reserved.</p>
      </footer>
      {contestDetailsModal.isOpen ? <Details /> : <></>} 
      {authModal.isOpen && <AuthModal />}
    </main>
  );
}
