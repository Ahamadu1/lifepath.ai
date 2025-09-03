'use client';
import Image from "next/image";
import { startTransition ,useState} from "react";
import Pages from './Questionaire/Pages'



// const start =()=>{
//   <Pages />
// }
export default function Page() {
  const [started,setStarted]= useState(false)
  
  return (
    <>
    {started ? (
        <Pages />
      ) : (

    <div className="flex flex-col items-center justify-center  pt-10 rounded-md bg-gradient-to-r from-blue-900 to-purple-700  w-full h-screen text-white">
    <h1 className="text-2xl font-bold ">Build a Roadmap to Your Dream Life.</h1>
    <p className="text-xs pb-7">LifePath AI gives you a custom plan — based on your goals, habits, and income, in just 15 minutes.</p>
    <button className="text-l  rounded-lg p-2 bg-black text-white" onClick={()=>setStarted(true)}>START</button>
    </div>
     )}
    </>
  );
}
