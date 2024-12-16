import React from "react";
import { authModalState } from "@/Atoms/authModalAtom";
import AuthModal from "@/Components/Modals/AuthModal";
import Navbar from "@/Components/Navbar";
import ContestCard from "@/Components/ContestCard";
import { useRecoilValue } from "recoil";

type Props = {};

export default function ContestsPage({}: Props) {
  const authModal = useRecoilValue(authModalState);

  const upcomingContests = [
    {
      title: "Contest Round 1",
      endDate: new Date("2024-12-31T23:59:59"),
      image: "/contest.jpeg",
    },
    {
      title: "Contest Round 2",
      endDate: new Date("2025-01-15T23:59:59"),
      image: "/contest.jpeg",
    },
  ];

  const ongoingContests = [
    {
      title: "Contest Round 3",
      endDate: new Date("2024-12-20T23:59:59"),
      image: "/contest.jpeg",
    },
  ];

  return (
    <main className="bg-white text-black min-h-screen">
      <Navbar />

      <div className="contests px-16 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 uppercase tracking-widest">
          Contests Page
        </h1>

        {authModal.isOpen && <AuthModal />}
        
        {/* Ongoing Contests Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
            Ongoing Contests
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {ongoingContests.map((contest, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-[300px] transition-transform hover:scale-105">
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="rounded-t-lg h-40 w-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{contest.title}</h3>
                <p className="text-sm mb-4 text-gray-600">
                  Ends on: {contest.endDate.toDateString()}
                </p>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  Participate
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
            Upcoming Contests
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {upcomingContests.map((contest, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-md p-4 w-[300px] transition-transform hover:scale-105"
              >
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="rounded-t-lg h-40 w-full object-cover mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{contest.title}</h3>
                <p className="text-sm mb-4 text-gray-600">
                  Ends on: {contest.endDate.toDateString()}
                </p>
                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                  Register
                </button>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}