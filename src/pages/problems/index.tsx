import { authModalState } from '@/Atoms/authModalAtom';
import AuthModal from '@/Components/Modals/AuthModal';
import Navbar from '@/Components/Navbar';
import ProblemsTable from '@/Components/ProblemsTable';
import { firestore } from '@/firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { problems } from './problems';

type Props = {};

export default function ProblemsPage({}: Props) {
  const authModal = useRecoilValue(authModalState);

  const [inputs,setInputs]=useState({
    id:'',
    title:'',
    difficulty:'',
    category:'',
    link:'',
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setInputs({...inputs,[e.target.name] : e.target.value});
  }
  console.log(inputs);

  const handleSubmit = async(e: React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();
    //convert input.order to integer
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    }
    await setDoc(doc(firestore, "problems", inputs.id), inputs);
    alert("Saved to Firestore DB");
  }

  return (
    <>
      <Navbar />
      <h1 className="text-3xl text-center text-gray-900 font-semibold mt-10 mb-6 uppercase">
        &ldquo; QUALITY OVER QUANTITY &rdquo; 
      </h1>

      <div className="relative overflow-x-auto mx-auto px-4 sm:px-6 pb-10">
        <table className="w-full text-sm text-left text-gray-800 sm:w-10/12 max-w-[1200px] mx-auto bg-white shadow-lg rounded-xl">
          <thead className="text-[16px] text-black-900 uppercase border-b bg-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-left">Status</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Title</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Difficulty</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Category</th>
              <th scope="col" className="px-6 py-3 font-semibold text-left">Companies</th>
            </tr>
          </thead>
          <ProblemsTable />
        </table>
      </div>
      
      {/* Temporary form to add problems to db */}
      <form onSubmit={handleSubmit} className='p-6 flex flex-col max-w-sm gap-3'>
        <input onChange={handleInputChange} className='bg-black text-white' type="text" placeholder='problem id' name='id' />
        <input onChange={handleInputChange} className='bg-black text-white' type="text" placeholder='title' name='title' />
        <input onChange={handleInputChange} className='bg-black text-white' type="text" placeholder='difficulty' name='difficulty' />
        <input onChange={handleInputChange}className='bg-black text-white' type="text" placeholder='category' name='category' />
        <input onChange={handleInputChange}className='bg-black text-white' type="text" placeholder='order' name='order' />
        <input onChange={handleInputChange}className='bg-black text-white' type="text" placeholder='link?' name='link' />
        <button className='bg-black text-white'>Save to db</button>
      </form>

      {authModal.isOpen && <AuthModal />}
    </>
  );
}
