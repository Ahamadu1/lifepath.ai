'use client';
import React from 'react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import Path from '../Path/Path'

function Ask(props) {
    const [info,setInfo] = useState('');
    const [pastChat,setpastChat] = useState([]);
    const [data,setData] = useState(null);
    const [exit,setExit] = useState(false);
    const downloadPDF = ()=>{
      // const doc = new jsPDF();
      // chatHistory.forEach(({ prompt, response }) => {
      //   doc.addPage();
      //   doc.text(`Q: ${prompt}`, 10, 20);
      //   doc.text(`A: ${response}`, 10, 40);
      // });
      setExit(true)
      

    }
    const roadmapForApi = props.roadmap && !props.roadmap.raw ? props.roadmap : null;
    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            
            console.log(props.roadmap);
            const response = await fetch("api/generator", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                type:'deep_dive',
                question: info,
                roadmap: roadmapForApi,
                history: pastChat,
              }),
            });
            
            const result = await response.json();
            let parsed = result?.plan;
            if (typeof parsed === 'string' && parsed.trim().startsWith('{')) {
              try {
                parsed = JSON.parse(parsed);
              } catch {
                // keep as string if parsing fails
              }
            }
            setData(result.plan);
            console.log(data)
            setpastChat(prev => [
                ...prev,
                { prompt: info, response: parsed }
              ]);
            setInfo('');
          } catch (err) {
            console.error('Error submitting to OpenAI:', err);
          }
      
    };
    
    if (exit) return <Path chat={pastChat} data={{ plan: props.roadmap }} />;
    return ( 
       

        
    
      <div className="min-h-screen w-full bg-gradient-to-r from-blue-900 to-purple-700 px-10 py-12">
       <button className='fixed top-10 right-10 z-50 bg-blue-900 text-white px-4 py-2 rounded' onClick={()=>downloadPDF()}>Save & Exit</button>
    <h3 className='text-3xl font-semibold pb-5 text-center'>Ask question about your path</h3>

        
    {pastChat.length > 0 && (
  <div className=''>
    {pastChat.map((chat, i) => (
      <div key={i} className='mb-4'>
      <div className='mb-4 flex justify-end'>
        <div className='pr-5 bg-[#0a0a4a]  mb-4 text-white p-3 rounded-t-lg font-semibold '>
          {chat.prompt}
        </div>
        </div>
        <div className= 'bg-[#0a0a4a] text-white p-4 rounded-b-lg whitespace-pre-wrap'>
          {chat.response}
        </div>
      </div>
    ))}

  </div>
)}


      
      <form onSubmit={handlesubmit} className='flex  gap-2 justify-center '>
      <input
        type='text'
        placeholder='Ask Aything...'
        value={info}
        onChange={(e) => setInfo(e.target.value)}
        className=' w-[36rem] p-4 rounded-xl bg-[#0a0a4a] text-white placeholder-gray-300 border'
      />
      <button type='submit'>
        <img className='h-10 w-10 bg-white rounded-full hover:bg-gray-300' src='1361762.png' />
      </button>
    </form>
  </div>
   
  );
}


export default Ask;