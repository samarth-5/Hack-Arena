import React from "react";
import { BsChevronUp } from "react-icons/bs";

type Props = {};

export default function EditorFooter({}: Props) {
  return (
    <div className="flex bg-white absolute bottom-0 z-10 w-full shadow-md">
      <div className="mx-5 my-[10px] flex justify-between w-full">

        <div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
          <button
            className="px-5 py-2 font-semibold items-center transition-all inline-flex 
            bg-black text-white text-base hover:bg-gray-800 rounded-full shadow-lg"
          >
            Console
            <div className="ml-2 transform transition flex items-center">
              <BsChevronUp className="fill-white mx-1" />
            </div>
          </button>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <button className="px-5 py-2 text-base font-semibold items-center whitespace-nowrap transition-all 
            focus:outline-none inline-flex bg-black text-white hover:bg-gray-800 rounded-full shadow-lg">
            Run
          </button>

          <button className="px-5 py-2 font-semibold items-center transition-all focus:outline-none inline-flex 
            text-base bg-black text-white hover:bg-gray-800 rounded-full shadow-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
