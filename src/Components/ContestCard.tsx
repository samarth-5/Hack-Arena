import React, { useEffect, useState } from "react";

type CountdownTimerProps = {
  endDate: Date;
};

const CountdownTimer = ({ endDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

  function getTimeLeft(endDate: Date) {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    return {
      days: Math.max(Math.floor(distance / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0),
      minutes: Math.max(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 0),
      seconds: Math.max(Math.floor((distance % (1000 * 60)) / 1000), 0),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="text-sm font-semibold text-gray-700">
      {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
    </div>
  );
};

type ContestCardProps = {
  title: string;
  endDate: Date;
  image: string;
  actionLabel: string;
};  

const ContestCard = ({ title, endDate, image, actionLabel }: ContestCardProps) => {
  return (
    <div className="w-full max-w-xs border border-gray-300 rounded-2xl bg-white shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl">
      <div className="w-full h-56 p-2 bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-t-xl" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-black mb-3">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Test your problem-solving skills with DSA. Compete with others and solve challenging problems.
        </p>
        {actionLabel !== "Participate" && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold">Starts in</span>
            <CountdownTimer endDate={endDate} />
          </div>
        )}

        <div className="mt-4 flex gap-4">
          <button className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all">
            {actionLabel}
          </button>
          <button className="flex-1 border border-black text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-all">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;