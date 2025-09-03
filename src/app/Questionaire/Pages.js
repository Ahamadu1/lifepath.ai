'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Loading from '../Loading/Loading'
import Path from '../Path/Path'

function Pages(props) {
  // const {data:{session}} =  supabase.auth.getSession()
  const [result, setresult] = useState('')
  const [loading, setloading] = useState(false)
  const [send, setsend] = useState(false)
  const [questions, setquestions] = useState({
    age: '',
    gender: '',
    living_situation: '',
    location: '',
    current_income: '',
    expenses: '',
    dept: '',
    savings: '',
    dreamlife: '',
    dream_income: '',
    retirement_age: '',
    dream_networth: '',
    money_management: '',
    risk_tolerance: '',
    job_or_business: '',
    money_or_passion: '',
    current_skills_passion: '',
    college_bootcamp_training: '',
    investment_budget: '',
    education_timespan: ''
  })
  const [page, setpage] = useState(1);
  const [session, setsession] = useState("")
  const storeResults = async () => {
    const { data, error } = await supabase
      .from('response')
      .insert([{ ...questions }]);
  }
  const handlePrev = () => {
    setpage(prev => prev - 1);
  };


  const handlesubmit = async () => {

    try {
      const response = await fetch("api/generator", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: "first_prompt",
          ...questions}),
      });
      const data = await response.json()
      setresult(data)
      setsend(true);
      console.log('Your custom plan:', data.plan);
    } catch (err) {
      console.error('Error submitting to OpenAI:', err);
    }

  };
  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session fetch error:', error);
      } else {
        setsession(data.session);
      }
      setloading(false);
    }

    fetchSession();
  }, []);
  const handleChange = (e) => {


    setquestions(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleNext = () => {
    setloading(true);
    setTimeout(() => {
      setpage(prev => prev + 1);
      setloading(false);
    }, 250); // simulate loading delay, or replace with real async task
  };


  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-purple-700 h-full w-full h-screen text-white ' >
      {loading ? (
        <Loading />
      ) : send ? (
        <Path data={result} />
      ) : (
        <div className="flex flex-col p-6 max-w-xl mx-auto justify-center items-center">
          <div className='w-40 h-2 bg-purple-600 pb rounded-lg'><div className=' h-2 bg-blue-600 rounded-lg' style={{ width: `${(page / 20) * 100}%` }}></div></div>
          <h2 className="text-sm align-middle mb-4 justify-center items-center pt-4 ">Question {page} of 20</h2>
          <form>

            {page === 1 && (
              <div className="flex flex-col  justify-center items-center">
                <label> <h1 className='text-2xl  font-semibold align-middle  mb-3' >Age</h1> </label>
                <input name="age" value={questions.age} onChange={handleChange} className='border border-gray-300 rounded-lg pb bg-blue-950' />
                <label> <h1 className='text-2xl font-semibold  align-middle  mb-3 pt-3'>Gender</h1> </label>
                <input name="gender" value={questions.gender} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 h-s' />

              </div>
            )}

            {page === 2 && (
              <div className="flex flex-col  justify-center items-center">
                <label ><h1 className='text-2xl  font-semibold align-middle  '>Living Situation</h1></label>
                <p className='pb-4'>Explain your current living situation in detail</p>
               
                <input name="living_situation" value={questions.living_situation} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-4 w-full'  />
              </div>
            )}

            {page === 3 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Location</h1></label>
                <p className='pb-4'>Where do you live (e.g Eastcounty ,Albany, NY)</p>
                <input name="location" value={questions.location} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 4 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Income</h1></label>
                <p className='pb-4'>What is your annual income</p>
                <input name="current_income" value={questions.current_income} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 5 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Expenses</h1></label>
              <p className='pb-4'>What is your total monthly expenses</p>
              <input name="expenses" value={questions.expenses} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 6 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Dept</h1></label>
              <p className='pb-4'>How much money do you have in Dept?</p>
              <input name="dept" value={questions.dept} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 7 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Saving</h1></label>
              <p className='pb-4'>How much money do you have saved up?</p>
              <input name="savings" value={questions.savings} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 8 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Dream Life</h1></label>
              <p className='pb-4'>Describe your dream life in detail</p>
              <input name="dreamlife" value={questions.dreamlife} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 9 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Dream Income</h1></label>
                <p className='pb-4'>What is your Dream income</p>
                <input name="dream_income" value={questions.dream_income} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 10 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Retirement Age</h1></label>
              <p className='pb-4'>At what age would you like to retire?</p>
              <input name="retirement_age" value={questions.retirement_age} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 11 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Dream Net worth</h1></label>
                <p className='pb-4'>What is your Dream Net worth</p>
                <input name="dream_networth" value={questions.dream_networth} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 12 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Money Management Syle</h1></label>
                <p className='pb-4'>How are you with money( Are you more of a saver or splurger?) explain</p>
                <input name="money_management" value={questions.money_management} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 13 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Risk Tolerance</h1></label>
                <p className='pb-4'>How comfortable are you with taking financial risks on a scale of 1-10?</p>
                <input name="risk_tolerance" value={questions.risk_tolerance} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 14 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Career Choice</h1></label>
              <p className='pb-4'>Do you want to work a job or run your own business? Explain</p>
              <input name="job_or_business" value={questions.job_or_business} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 15 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Priority</h1></label>
              <p className='pb-4'>Do you prioritize money or passion?</p>
              <input name="money_or_passion" value={questions.money_or_passion} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 16 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Passions & Skills</h1></label>
                <p className='pb-4'>What skills do you currently have and what are your passions; </p>
                <input name="current_skills_passion" value={questions.current_skills_passion} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 17 && (
              <div className='flex flex-col  justify-center items-center'>
                <label><h1 className='text-2xl  font-semibold align-middle  '>Education</h1></label>
                <p className='pb-4'>Are you open to going to college, bootcamp or any other mentorship/training</p>
                <input name="college_bootcamp_training" value={questions.college_bootcamp_training} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
              </div>
            )}

            {page === 18 && (
             <div className='flex flex-col  justify-center items-center'>
             <label><h1 className='text-2xl  font-semibold align-middle  '>Investment Budget</h1></label>
             <p className='pb-4'>Are you open to going to college, bootcamp or any other mentorship/training</p>
             <input name="investment_budget" value={questions.investment_budget} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
           </div>
            )}

            {page === 19 && (
              <div className='flex flex-col  justify-center items-center'>
              <label><h1 className='text-2xl  font-semibold align-middle  '>Education Timespan</h1></label>
              <p className='pb-4'>what is the maximum amount of time you are willing to spend on Education.</p>
              <input name="education_timespan" value={questions.education_timespan} onChange={handleChange} className='border border-gray-300 rounded-lg  bg-blue-950 p-2 w-full'/>
            </div>
            )}

            {page === 20 && (
              <div className='flex flex-col justify-center items-center pt-5'>
                <h3 className='text-2xl font-bold'>Review & Submit</h3>
                <div className="">
  {Object.entries(questions).map(([key, value]) => (
    <div key={key} className="flex justify-between  pb-1">
      <span className="font-semibold capitalize">{key.replace(/_/g, ' ')}:</span>
      <span>{value || '—'}</span>
    </div>
  ))}
</div>

                <button onClick={(e) => {
                  e.preventDefault(); // prevent page refresh
                  console.log("Clicked Submit button");
                  handlesubmit();
                  console.log("Submit data:", questions);
                }} className=" bg-green-600 text-white px-4 py-2 rounded" >Submit</button>
              </div>
            )}




            <div className="mt-4 flex justify-between">
              {page > 1 && (
                <button onClick={handlePrev} className="bg-none border px-4 py-2 rounded-lg">Previous</button>
              )}
              {page < 20 && (
                <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 ml-39 w-20 rounded-lg">Next</button>
              )}
            </div>

          </form>
        </div>
      )}


      
    </div>
  );
}



export default Pages;