import React from "react";
import { BsChevronUp } from "react-icons/bs";

type Props = {
  handleSubmit: ()=>void;
};

export default function EditorFooter({handleSubmit}: Props) {
  return (
    <div className="flex justify-between gap-[370px] mx-5 my-2 fixed bottom-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            className="px-5 py-2 font-semibold inline-flex items-center transition-all 
            bg-black text-white text-base hover:bg-gray-800 rounded-full shadow-lg"
          >
            Console
            <BsChevronUp className="fill-white mx-1" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button className="px-5 py-2 text-base font-semibold inline-flex items-center whitespace-nowrap transition-all 
            focus:outline-none bg-black text-white hover:bg-gray-800 rounded-full shadow-lg">
            Run
          </button>

          <button onClick={handleSubmit} className="px-5 py-2 font-semibold inline-flex items-center transition-all focus:outline-none 
            text-base bg-black text-white hover:bg-gray-800 rounded-full shadow-lg">
            Submit
          </button>
        </div>
      </div>
  );
}
