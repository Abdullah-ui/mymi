import { NextResponse } from "next/server";
import {Groq} from "groq-sdk";

const client = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROK_API_KEY })
const MODEL = 'llama-3.3-70b-versatile'
// const MODEL = 'gemma2-9b-it'
// const MODEL = 'deepseek-r1-distill-llama-70b'

const systemInstructions = `
**Role:** You are a strict and critical technical interviewer conducting a 25-minute interview. Your goal is to assess the candidate's technical knowledge, problem-solving skills, and coding ability while maintaining a structured format.  

**Interview Structure:**  
1. **Introduction Phase (Max 3 Questions)**  
   - Ask the candidate to introduce themselves.  
   - Ask a follow-up question based on their introduction.  
   - Keep follow-ups minimal (1-2 only), then transition to coding. 
   - You have only 3 minutes for this phase and you also have to grade if the interviewer takes longer than the given phase or gives an irrelevant answers.  

2. **Problem Understanding Phase**  
   - Present a coding problem.  
   - Ask the candidate to explain the problem in their own words, specifying the inputs, expected outputs, and constraints.  
   - Ensure they understand the problem before moving forward.  

3. **Coding Phase**  
   - Ask the candidate how they would approach the problem.  
   - Challenge their plan with 1-2 follow-up questions.  
   - Ask them to write the code while thinking out loud.  

4. **Solution Analysis Phase**  
   - Ask them to explain what their code does.  
   - Identify any mistakes and challenge them on their approach.  
   - Ask about time and space complexity.  
   - Ask if they can optimize the solution.  
   - If they propose an optimization, ask how it improves the solution.  

5. **Conclusion**  
   - Thank the candidate for the interview.  
   - Provide an evaluation based on:  
     - Communication (how well the user is able to structure their thoughts)
     - Coding skills (how well the user is able to write code) 
     - Professionalism (how well the user is able to deal with answers and display a good attitudes towards the changes suggested in the course of the interview)
     - Problem understanding (how well the user is able to understand the problem statement)
     - Adaptability (how well the user is able to adapt to the changes suggested in the course of the interview)
     - Code quality (variable naming, comments, structure)  

**Interview Guidelines:**  
- Stick to the **introduction → problem understanding → coding → analysis** format.  
- Make sure the interviewee introduces themselves properly including their background and experience.
- If they are unable to answer any question in particular, move ahead after trying it for a while.
- Once coding begins, **do not return to background questions**.  
- **One question per response.** No multi-question responses.  
- **Do not give answers outright;** provide hints if needed.  
- Keep **follow-ups to a max of 1-2 per phase.**  
- Ensure the interview **stays within 25 minutes** by managing time effectively.  
- Do not repeat questions; maintain a **unique question sequence.**
- Do not include statements like "Here's a natural response."
- Do not exceed **3 background questions** before transitioning to coding.
- Do not ask too long questions; keep them concise and clear.
- Ask only one question at a time and **avoid multiple questions in one response.**
- Once you have asked all the question thank the interviewee and tell them that they can now end this session.
`

// this will be fed to the model
var messages = [
    {
        role: "system",
        content: systemInstructions,
    },
];

// this is for the history for own personal keepsakes
var chat_history = [
    {
        role: "system",
        content: systemInstructions,
    },
    {
        role: "user",
        content: "You are a technical interviewer",
    }
]

const handleEndInterview = async() => {
    // this is the function that will be called when the user ends the interview

    const prompt = `The interview session has now ENDED. Evaluate the conversation so far and You have to evaluate as a critical interviewer and return a json response containing scores out of 10 for communication skills, professionalism, adaptability, coding skills, clean code writing and optimized code writing.
            You have to give weightage of 2 to communication, 2 to undestanding of the problem statement, 1 to professionalism, 1 to adaptability, 3 to coding skills, 1 to clean code writing and 2 to optimization and calculation an overall score out of 100 for the interviewee.
            Make sure to calculate the results as accurate as possible and do not assume any scores on your own the json object you will be returning must striclty depict the performance of the user as it will be used to help the interviewee become better at interviewing.
            If the user has not written any code, mark the coding aspect to 0 and the clean code writing and optimization to 0 as well. You have to evaluate striclty on the performance of the interviewee in the interview session.
            Aside from these scores I want you to identify the strengths, weaknesses and areas of improvement for the interviewee.
            
            the grading criteria is as follows:
            - Communication (how well the user is able to structure their thoughts)
            - Coding skills (how well the user is able to write code) 
            - Professionalism (how well the user is able to deal with answers and display a good attitudes towards the changes suggested in the course of the interview)
            - Problem understanding (how well the user is able to understand the problem statement)
            - Adaptability (how well the user is able to adapt to the changes suggested in the course of the interview)
            - clean code writing (variable naming, comments, structure)  
            - Optimization (time and space complexity analysis, optimization of the code)
            
            You have to return a json containing the scores in the following format
            sample response looks like this:
            {
                "results": {
                  overall: 87,
                  communication: 9,
                  understanding: 5, 
                  professionalism: 8,
                  adaptability: 7,
                  codingSkills: 9,
                  cleanCodeWriting: 8,
                  optimization: 9,
                },
                "strengths": ["Good communication", "Strong coding skills"],
                "weaknesses": ["Lack of adaptability", "Needs improvement in clean code writing"],
                "areasOfImprovement": ["Adaptability", "Clean code writing"],
            }

            RETURN ONLY ONE JSON RESPONSE CONTAINING SCORES AND DO NOT RANDOMLY ASSUME ANYTHING ON YOUR OWN EXCEPT FOR WHAT THE ACTUAL SCORES ARE BASED ON THE INTERVIEW SESSION. DONT GIVE ANY EXPLANATION FOR THE SCORES. 
            DONOT INCLUDE ANYTHING ELSE IN THE RESPONSE BESIDES THE JSON.
            `

    await addToTheChatHistory("user", prompt);

    const results = await makeRequestToLLM();

    await addToTheChatHistory("system", results);

    return results;
}

const makeRequestToLLM = async() => {
    // this is the function that will be called when the user sends a message to the model

    try {
        const response = await client.chat.completions.create({
            //
            // Required parameters
            //
            messages: messages,
        
            // The language model which will generate the completion.
            model: MODEL,    
            temperature: 0.5,       // Controls randomness: lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
            max_tokens: 1024,      // The maximum number of tokens to generate. Requests can use up to 2048 tokens shared between prompt and completion.
            top_p: 1,             // Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.
            stop: null,           // A stop sequence is a predefined or user-specified text string that signals an AI to stop generating content, ensuring its responses remain focused and concise. Examples include punctuation marks and markers like "[end]".
            stream: false,       // If set, partial message deltas will be sent.
          });
          
       const results = response.choices[0].message.content;
    
       return results;
    } catch (error) {
        if (error.status === 429) {
            console.error("Rate limit exceeded. Please try again later.");
        }
        return "Some error occured. Please try again later.";
    }
}

const addToTheChatHistory = async(role, prompt, userResponse = null, usersCode = null) => {
    // this is the function that will be called when the user adds a message to the chat history
    
    messages = [
        ...messages,
        {
            role: role,
            content: prompt,
        }
    ]

    if (userResponse === null && usersCode === null){
        chat_history = [
            ...chat_history,
            {
                role: "system",
                content: prompt,
            }
         ]
         return;
    }

     chat_history = [
        ...chat_history,
        {
            role: "user",
            content: "User reply: " + userResponse + "\nUser's Code: " + usersCode,
        }
    ]
}

/*  
    This is the POST method that will be called when the user sends a message to the bot
    The user will send the userResponse, codingQuestion, modelSolution and usersCode
    req: {
        userResponse: "the answer given to the model during interview",
        codingQuestion: "the question user have to solve in the duration",
        modelSolution: "the model solution to this problem",
        usersCode: "the coding solution that the user wrote",
    }
*/
export async function POST(req) {
    const data = await req.json();  // fetching the data 

    const codingQuestion = data.codingQuestion || "none provided";
    const modelSolution = data.modelSolution || "none provided";
    const usersCode = data.usersCode || "none provided";
    const userResponse = data.userResponse;
    const timeLeft = data.timeLeft || "25 mins left";

    var prompt = ""

    if (userResponse === "end the interview"){
        // handling the end of interview and generating scores based on all the conversation held so far
        const r = await handleEndInterview();
        return new NextResponse(r);
    } else {
        // setting the prompt for the user to send to the model
        prompt = "The interviewee replied with: '" + userResponse + "' and provided this code: '" + usersCode + " ' to the question: '" + codingQuestion + "' with the model solution: " + modelSolution + "\n Respond to this as a TECHNICAL INTERVIEWER. Make it as humanly as possible. \n You have " + timeLeft + " minutes left. Give one question at a time. Do not follow up on the sample problem and the code until the user has written some code. Focus on introduction first then move on to the coding aspect even if the model solution is provided. Once the coding part has started do not follow up on the background anymore. Do not read the question out loud and instead ask the user to read the question and explain what the question asks. Keep the response short. ask follow up questions if necessary but dont get too caught up with follow up question. just one or two would suffice. ask only one question at a time"; 
    }

    if (userResponse === "begin the interview"){
        // handling the start of the interview by setting the lists to their initial states
        messages = [
            {
                role: "system",
                content: systemInstructions,
            },
        ];
        
        chat_history = [
            {
                role: "system",
                content: systemInstructions,
            },
        ]
    }

    console.log(userResponse)   // for testing purpose only

    await addToTheChatHistory("user", prompt, usersCode, codingQuestion);

    const results = await makeRequestToLLM();

    await addToTheChatHistory("system", results);

    console.log(messages.length)
     // if the length of the conversational exchanges gets longer than 5, we will start to remove the oldest entry
     if (Math.floor(messages.length/2) == 5){
        console.log("this part was executed")
        messages = [
            ...messages,
            {
                role: "user",
                content: `Summarize the above conversation in keeping in mind the key aspects to remember as a technical interviewer. You have to ensure that the important details of the interviewee that can be used for further analysis is not lost in the summarization process. Keep the track of all the questions asked so far and the next question in line. Analyze this as a human would do in a real interview and then make the summary. The order of the questions that have already been asked and the next that should be asked is important and shouldn't be lost. Keep the response short and concise. You have to analyze the conversation and summarize it in a way that is helpful for the interviewer to make a decision on the interviewee.
                Give the coversation flow in the following way:
                1. Introduction Phase: completed or not with score
                2. Problem Understanding Phase: completed or not with score
                3. Coding Phase: completed or not with score
                4. Code explanation: completed or not with the score
                5. time and space complexity analysis: completed or not with the score

                When the given question is currectly solved, ask the interviewee to end the session if they like.

                once the conversation has moved from one phase to another mark the previous with completed even if the user's responses were not satisfactory. do not mark with partially completed

                your response should contain a brief summary of overall conversation, followed by the points mentioned above. You have to make sure that the conversation flow is maintained and the points are not lost. be as critical as possible for the grading
                `,
            }
        ]

        const response = await makeRequestToLLM();

        messages = [
            {
                role: "system",
                content: response,
            },
            {
                role: "user",
                content: "Continue the interview in the flow it is supposed to be. Focus on the NOT COMPLETED ONLY. DONOT TAKE A STEP BACK TO THE PREVIOUSLY ASKED QUESTIONS. You have to make sure that the conversation flow is maintained and the points are not lost. If everything is done, thank the interviewee for participating in the interview and ask them to end the session if the given question is completed. Focus on what the summary suggests the next question should be. If any part is marked no need to ask questions on that",
            }, 
            {
                role: "system",
                content: messages[messages.length-4].content,
            },
            {
                role: "user",
                content: messages[messages.length-3].content,
            },
            {
                role: "system",
                content: messages[messages.length-2].content,
            },
        ]

        console.log(messages)
     }
 
     return new NextResponse(results)
}