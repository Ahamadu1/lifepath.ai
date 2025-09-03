'use client';
import React from 'react';
import Ask from '../Ask/Ask';
import { useState } from 'react';
import jsPDF from 'jspdf';
import Done from '../Done/Done';



function Path(props) {
    const loadData = async()=>{
        const response = await fetch("")
    }
    const [exit,setExit] = useState(false)
    const downloadPdf = ()=>{
      const doc = new jsPDF();
      let y = 10;
      PHASE_ORDER.forEach((key) => {
        const body = sections[key];
        if (!body) return;
      
        doc.setFontSize(14);
        doc.text(key, 10, y); // section title
        y += 8;
      
        doc.setFontSize(11);
        const lines = doc.splitTextToSize(body, 180); // wrap text in page
        doc.text(lines, 10, y);
        y += lines.length * 7;
      
        y += 10; // space between sections
      
        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
      props.chat.forEach(({ prompt, response }) => {
        doc.addPage();
        doc.text(`Q: ${prompt}`, 10, 20);
        doc.text(`A: ${response}`, 10, 40);
      });
      doc.save("final.pdf");

      

    }
    const [sendToAsk, setSendToAsk] = useState(false);
    const PHASE_ORDER = [
  "🌱 Foundation (0–6 months)",
  "🚀 Momentum (6–24 months)",
  "🏁 Long-Term Vision (2–5+ years)",
];
let sections = props?.data?.plan;

if (typeof sections === 'string') {
  try {
    sections = JSON.parse(sections);
  } catch (err) {
    console.error("Failed to parse plan JSON:", err);
    sections = { raw: sections }; // fallback so UI doesn’t crash
  }
}

if (!sections || typeof sections !== 'object') {
  // just show raw instead of throwing an error
  return (
    <pre className="whitespace-pre-wrap text-sm">
      {String(sections)}
    </pre>
  );
}

    if (exit) return <Done/>;
    return (
      <div className='min-h-screen w-full bg-gradient-to-r from-blue-900 to-purple-700 px-10 py-12'>
      {!sendToAsk? (
        <>
       
            <h2 className='font-bold text-2xl'>Here is your full path</h2>
            {PHASE_ORDER.map((key) => {
                    const body = sections[key];
                    if (!body) return null;
                    return (
                      <div key={key} className="mb-8">
                        <h3 className="text-xl font-semibold mb-2">{key}</h3>
                        <pre className="whitespace-pre-wrap text-sm border rounded-xl bg-blue-900 text-white p-4">
                          {body}
                        </pre>
                      </div>
                    );
})}
            <div className='flex flex-row justify-center items-center gap-3'>
              <button className='bg-black text-white rounded-md p-3' onClick={()=>downloadPdf()}>Download PDF</button>
              <button  className='bg-black text-white rounded-md p-3' onClick={()=>setSendToAsk(true)}>Ask Questions</button>
            </div>
          </>
          ):(
            <Ask roadmap={sections}/>
          
            )}
          
      </div>
    


);

}
export default Path;