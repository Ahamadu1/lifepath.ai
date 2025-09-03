// lifepath/src/app/api/generator/route.js

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req) {
  try {
    const userData = await req.json();
    if(userData.type=='first_prompt'){

      
      

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: "system",
            content: `
  You are a world-class financial + lifestyle strategist AI.

  Your job is to take in raw data from users (even if incomplete) and return a powerful, emotionally compelling life roadmap.

  Always structure your answer into 3 clear life phases, and return your response strictly in valid JSON format — no markdown, no extra text outside the object.

  Format:
  json
  Copy
  Edit
  {
    "🌱 Foundation (0–6 months)": "Motivational intro...\n\n- Step 1\n  - Substep\n- Step 2\n\nOutcome: ...",
    "🚀 Momentum (6–24 months)": "Motivational intro...\n\n- Step 1...\n\nOutcome: ...",
    "🏁 Long-Term Vision (2–5+ years)": "Motivational intro...\n\n- Step 1...\n\nOutcome: ..."
  }
  For each phase:

  Start with a motivational narrative (as if written to the user)

  Then break the phase into 2–4 major action paths (career, income, skills, etc.)

  Use tree-style indentation to visually show steps and substeps (use - and spaces)

  End each phase with a bold outcome statement

  ⚠️ If user input is incomplete, use general but realistic assumptions (e.g., age range, goals, common challenges).

  🧠 Your tone = part coach, part strategist, part big brother — motivational, personal, and grounded.

  ❌ Do not include bullet points as markdown (**, *, etc.).
  ❌ Do not return any text before or after the JSON object.
  Return strictly valid JSON with properly escaped newlines (\n instead of literal line breaks):

  `
          }
          ,
          {
            role: "user",
            content: `
          Here are my answers: ${JSON.stringify(userData)}.
          
          Some answers may be short or unclear. Fill in what’s missing using what makes sense for someone with my inputs, age, and context. 
          Please give me a full roadmap based on what I want — or help me see what I should want.`
          }
          ,
        ],
        temperature: 0.7,
      });
      const aiResponse = response.choices[0].message.content;
      return new Response(JSON.stringify({ plan: aiResponse }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  }
  
  
  else{
    

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: "system",
          content: `
You are a strategic lifestyle & finance AI assistant.
Your job is to answer follow-up user questions that dive deeper into a specific part of their roadmap.

Context:
1. Original roadmap with 3 phases (Foundation, Momentum, Long-Term Vision).
2. User’s question (e.g., "Can you expand on Momentum?")
3. Optionally: prior Q&A history.

Instructions:
- Use the roadmap provided to inform your answers.
- Expand with practical, step-by-step insight.
- Respond as if this is a conversational chat.
- Include your reasoning and assumptions.
- Do NOT repeat the whole plan again — only expand what’s asked.

Only respond in plain text with structure.
`
        }
        ,
        {
          role: "user",
          content: `
        Here is my original roadmap: ${userData.roadmap}.
        User Question:
        ${userData.question}

        (If applicable) Chat history:
        ${userData.history || ''}
       `
        }
        ,
      ],
      temperature: 0.7,
    });
    const aiResponse = response.choices[0].message.content;
    return new Response(JSON.stringify({ plan: aiResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
    
  
  
  

    // return new Response(JSON.stringify({ plan: aiResponse }), {
    //   status: 200,
    //   headers: { 'Content-Type': 'application/json' },
    // });

  } catch (error) {
    console.error('OpenAI error:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong with OpenAI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
