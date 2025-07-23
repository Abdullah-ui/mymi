import { NextResponse } from "next/server";
import { Groq } from "groq-sdk";

const API_KEYS = [
  process.env.NEXT_PUBLIC_GROK_API_KEY,
  process.env.NEXT_PUBLIC_GROK_BACKUP_KEY,
].filter(Boolean); // Filter out any undefined keys

let currentApiKeyIndex = 0;

function getClient() {
  if (!API_KEYS[currentApiKeyIndex]) {
    throw new Error("No valid API keys available");
  }
  return new Groq({ apiKey: API_KEYS[currentApiKeyIndex] });
  // return new Groq({ apiKey: process.env.NEXT_PUBLIC_GROK_BACKUP_KEY });
}

// const client = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROK_API_KEY })
const MODEL = "llama-3.3-70b-versatile";
// const MODEL = 'gemma2-9b-it'
// const MODEL = 'deepseek-r1-distill-llama-70b'

const systemInstructions = `*Role:* You are a strict, critical technical interviewer running a 25-minute session to assess technical knowledge, problem-solving and coding skills in a structured format.

*Phases:*

1. *Introduction (3 questions, 3 mins):*
   Q1: Ask user to introduce themselves.
   Q2: one follow-up on their intro.
   Q3: optional follow-up.
   - Grade if they exceed time or give irrelevant answers.
2. *Problem Understanding:*
   - Present the coding problem.
   - Have them restate inputs, outputs and constraints.
3. *Coding:*
   - Ask for their approach.
   - Pose 1-2 challenges.
   - Have them code aloud.
4. *Solution Analysis:*
   - Ask them to explain their code.
   - Identify mistakes, discuss time/space complexity.
   - Ask for optimizations and their benefits.
5. *Conclusion:*
   - Thank the candidate.
   - Evaluate on Communication, Coding Skills, Professionalism, Problem Understanding, Adaptability, Code Quality.

*Guidelines:*
* Stick to Intro → Understanding → Coding → Analysis → Conclusion.
* One question per response; no multi-question prompts.
* No more than 3 intro questions; once coding starts, don not revisit background.
* No outright answers—offer hints only.
* Unique questions; no repeats.
* Keep questions concise.
* Manage time to stay within 25 minutes.
* After the last question, thank them and close the session.
`;

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
  },
];

const handleEndInterview = async () => {
  try {
    const prompt = `The interview has ended. As a critical interviewer, evaluate the session and return only one JSON object with:

1. "results" (scores 0-10):
   - communication
   - understanding
   - professionalism
   - adaptability
   - codingSkills
   - cleanCodeWriting
   - optimization

2. Weight each score:
   communication=2, understanding=2, professionalism=1, adaptability=1, codingSkills=3, cleanCodeWriting=1, optimization=2.
3. Compute "overall" (0-100) as weighted sum.
4. If no code was written, set codingSkills, cleanCodeWriting, and optimization to 0.
5. Criteria:
   • communication: clarity of thought  
   • understanding: grasp of the problem  
   • professionalism: response to feedback  
   • adaptability: handling changes  
   • codingSkills: ability to write code  
   • cleanCodeWriting: naming, comments, structure  
   • optimization: complexity analysis and tuning
6. Also include:
   "strengths": array of strings,
   "weaknesses": array of strings,
   "areasOfImprovement": array of strings.
7. Base all scores strictly on the session—do not assume or invent.
8. Return only this JSON in this exact format:

{
  "results": {
    "overall": <int>,
    "communication": <int>,
    "understanding": <int>,
    "professionalism": <int>,
    "adaptability": <int>,
    "codingSkills": <int>,
    "cleanCodeWriting": <int>,
    "optimization": <int>
  },
  "strengths": [<string>, ...],
  "weaknesses": [<string>, ...],
  "areasOfImprovement": [<string>, ...]
}
            `;

    await addToTheChatHistory("user", prompt);
    const results = await makeRequestToLLM();

    // Extract JSON from the response (handles cases where there might be text around the JSON)
    let jsonResponse;
    try {
      // Try to find JSON in the response (handles cases where LLM might add text)
      const jsonMatch = results.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in the response");
      }
      jsonResponse = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Invalid JSON response from LLM");
    }

    // Validate the response structure
    const requiredFields = [
      "results.overall",
      "results.communication",
      "results.understanding",
      "results.professionalism",
      "results.adaptability",
      "results.codingSkills",
      "results.cleanCodeWriting",
      "results.optimization",
      "strengths",
      "weaknesses",
      "areasOfImprovement",
    ];

    // Check if all required fields are present
    for (const field of requiredFields) {
      const parts = field.split(".");
      let obj = jsonResponse;

      for (const part of parts) {
        if (!obj.hasOwnProperty(part)) {
          throw new Error(`Missing required field: ${field}`);
        }
        obj = obj[part];
      }
    }

    await addToTheChatHistory("system", JSON.stringify(jsonResponse));
    return jsonResponse;
  } catch (error) {
    console.error("Error in handleEndInterview:", error);

    // Return a default error response in the expected JSON format
    return {
      results: {
        overall: 0,
        communication: 0,
        understanding: 0,
        professionalism: 0,
        adaptability: 0,
        codingSkills: 0,
        cleanCodeWriting: 0,
        optimization: 0,
      },
      strengths: [],
      weaknesses: ["Error in evaluation"],
      areasOfImprovement: ["Technical evaluation error"],
    };
  }
};

const makeRequestToLLM = async (retryCount = 0, switchedKey = false) => {
  const MAX_RETRIES = 3;
  const RATE_LIMIT_DELAY = 5000; // 5 seconds delay for rate limits

  if (!API_KEYS[currentApiKeyIndex]) {
    throw new Error("No valid API key available");
  }

  try {
    const client = getClient();
    const response = await client.chat.completions.create({
      messages: messages,
      model: MODEL,
      temperature: 0.5,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
    });

    if (!response?.choices?.[0]?.message?.content) {
      throw new Error("Invalid response structure from LLM");
    }

    return response.choices[0].message.content;
  } catch (error) {
    console.error(`LLM request failed (attempt ${retryCount + 1}):`, error);

    // Switch API key on rate limit or auth error, only once per request
    if ((error.status === 429 || error.status === 401) && !switchedKey) {
      currentApiKeyIndex = (currentApiKeyIndex + 1) % API_KEYS.length;
      console.warn(`Switching API key to index ${currentApiKeyIndex}`);
      return makeRequestToLLM(retryCount, true);
    }

    // Handle rate limits specifically
    if (error.status === 429) {
      console.warn(
        `Rate limit exceeded. Waiting ${RATE_LIMIT_DELAY}ms before retry...`
      );

      // Exponential backoff for subsequent retries
      const delay = RATE_LIMIT_DELAY * Math.pow(2, retryCount);
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (retryCount < MAX_RETRIES) {
        return makeRequestToLLM(retryCount + 1, switchedKey);
      }
      return "An error occurred while processing your request. Please try again later.";
    }

    // Handle other retryable errors (like network issues)
    if (retryCount < MAX_RETRIES && isRetryableError(error)) {
      console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
      return makeRequestToLLM(retryCount + 1, switchedKey);
    }

    // Non-retryable error or max retries reached
    // throw new Error(`LLM request failed: ${error.message}`);
    return "An error occurred while processing your request. Please try again later.";
  }
};

// Helper function to determine if an error is retryable
function isRetryableError(error) {
  // Network errors, timeouts, and server errors are usually retryable
  return (
    !error.status || // No status code (likely network error)
    error.status >= 500 || // Server errors
    error.status === 408 || // Timeout
    error.status === 429 // Rate limit (handled separately)
  );
}

const addToTheChatHistory = async (
  role,
  prompt,
  userResponse = null,
  usersCode = null
) => {
  // this is the function that will be called when the user adds a message to the chat history

  messages = [
    ...messages,
    {
      role: role,
      content: prompt,
    },
  ];

  if (userResponse === null && usersCode === null) {
    chat_history = [
      ...chat_history,
      {
        role: "system",
        content: prompt,
      },
    ];
    return;
  }

  chat_history = [
    ...chat_history,
    {
      role: "user",
      content: "User reply: " + userResponse + "\nUser's Code: " + usersCode,
    },
  ];
};

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
  const data = await req.json(); // fetching the data

  const codingQuestion = data.codingQuestion || "none provided";
  const modelSolution = data.modelSolution || "none provided";
  const usersCode = data.usersCode || "none provided";
  const userResponse = data.userResponse;
  const timeLeft = data.timeLeft || "25 mins left";

  var prompt = "";

  if (userResponse === "end the interview") {
    // handling the end of interview and generating scores based on all the conversation held so far
    const r = await handleEndInterview();
    return new NextResponse(JSON.stringify(r), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    // setting the prompt for the user to send to the model
    prompt =
      "The interviewee replied with: '" +
      userResponse +
      "' and provided this code: '" +
      usersCode +
      " ' to the question: '" +
      codingQuestion +
      "' with the model solution: " +
      modelSolution +
      "\n Respond to this as a TECHNICAL INTERVIEWER. Make it as humanly as possible. \n You have " +
      timeLeft +
      " minutes left. Give one question at a time. Do not follow up on the sample problem and the code until the user has written some code. Focus on introduction first then move on to the coding aspect even if the model solution is provided. Once the coding part has started do not follow up on the background anymore. Do not read the question out loud and instead ask the user to read the question and explain what the question asks. Keep the response short. ask follow up questions if necessary but dont get too caught up with follow up question. just one or two would suffice. ask only one question at a time";
  }

  if (userResponse === "begin the interview") {
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
    ];
  }

  console.log(userResponse); // for testing purpose only

  await addToTheChatHistory("user", prompt, usersCode, codingQuestion);

  const results = await makeRequestToLLM();

  await addToTheChatHistory("system", results);

  console.log(messages.length);
  // if the length of the conversational exchanges gets longer than 5, we will start to remove the oldest entry
  if (Math.floor(messages.length / 2) == 5) {
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
      },
    ];

    const response = await makeRequestToLLM();

    messages = [
      {
        role: "system",
        content: response,
      },
      {
        role: "user",
        content:
          "Continue the interview in the flow it is supposed to be. Focus on the NOT COMPLETED ONLY. DONOT TAKE A STEP BACK TO THE PREVIOUSLY ASKED QUESTIONS. You have to make sure that the conversation flow is maintained and the points are not lost. If everything is done, thank the interviewee for participating in the interview and ask them to end the session if the given question is completed. Focus on what the summary suggests the next question should be. If any part is marked no need to ask questions on that",
      },
      {
        role: "system",
        content: messages[messages.length - 4].content,
      },
      {
        role: "user",
        content: messages[messages.length - 3].content,
      },
      {
        role: "system",
        content: messages[messages.length - 2].content,
      },
    ];

    console.log(messages);
  }

  return new NextResponse(results);
}