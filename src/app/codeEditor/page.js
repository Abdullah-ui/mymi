"use client"
import React from "react";
import MonacoEditor from "./components/MonacoEditor";
import Toolbar from "./components/Toolbar";
import QuestionPanel from "./components/QuestionPanel";
import { doc, getDoc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { firestore } from "../../../firebase";
const axios = require("axios")
import useCountdownTimer from "./components/useCountDownTimer";
import StartInterviewPopUp from "./components/StartInterviewPopUp";
import DisplayResults from "./components/DisplayResults";

if (typeof window !== "undefined") {
  window.webkitSpeechRecognition = window.webkitSpeechRecognition || null;
}

const page = () => {
  const [userDifficulty, setUserDifficulty] = useState("beginner")
  const [questionID, setQuestionID] = useState("1");
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [start, setStart] = useState(false);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [error, setError] = useState("");
  const [codeWritten, setCodeWritten] = useState("");
  const [interviewStartTime, setInterviewStartTime] = useState(0);
  const [codingLanguage, setCodingLanguage] = useState("python"); // our scope refines to currently cpp, python, java, javascript
  const [voices, setVoices] = useState();
  const [timeLeft, setTimeLeft] = useState(25);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [resultsData, setResultsData] = useState(null);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [difficulty, setDifficulty] = useState("");

  const codeRef = useRef("");

  // Reference to store the SpeechRecognition instance
  const recognitionRef = useRef(null);

  const updateUserExperienceLevel = async (userId) => {
    const docRef = doc(firestore, "users", userId); // "users" is the collection name
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data()

    if (userData.experienceLevel == "beginner" && userData.typesOfQuestionsSolved.easy >= 3 && userData.efficiency >= 90) {
        await updateDoc(docRef, {
        experienceLevel: "intermediate",
      });
  
    } else if (userData.experienceLevel == "intermediate" && userData.typesOfQuestionsSolved.medium >= 3 && userData.efficiency >= 85) {
        await updateDoc(docRef, {
        experienceLevel: "advanced",
      });
    } 
  };

  const getUserById = async (userId) => {
    try {
      const docRef = doc(firestore, "users", userId); // "users" is the collection name
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("User data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const getDataFromDatabase = async (userId) => {
    try {
      let randomQuestion = null;

      let userLevel = null; //beginner, intermediate, advanced

      try {
        const docRef = doc(firestore, "users", localStorage.getItem("sessionId")); // "users" is the collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          userLevel = docSnap.data().experienceLevel;
        }
      } catch (error) {
        console.error("Error fetching user experience level:", error);
      }
      
      let randomId = 1;

      while (true) {
        try{
          randomId = Math.floor(Math.random() * 2609) + 1;
  
          const docRef = doc(firestore, "problems", randomId.toString());
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            randomQuestion = docSnap.data();
            
            if (userLevel.toLowerCase() === "beginner" && randomQuestion.difficulty.toLowerCase() === "easy") {
              break;
            } else if (userLevel.toLowerCase() === "intermediate" && randomQuestion.difficulty.toLowerCase() === "medium") {
              break;
            } else if (userLevel.toLowerCase() === "advanced" && randomQuestion.difficulty.toLowerCase() === "hard") {
              break;
            }

          }
        } catch (error) {
          console.error("Error fetching random question:", error);
          continue;
        }
      }

      // Set state variables
      setQuestion(randomQuestion.content || "No content found");
      changeLanguageOfTheSolution(randomQuestion)
      setDifficulty(randomQuestion.difficulty || "Unknown");
      setQuestionID(randomId || "Unknown ID");

      // Optional: if you're still using a language change function
      if (typeof changeLanguageOfTheSolution === 'function') {
        changeLanguageOfTheSolution(randomQuestion.answer);
      }

    } catch (error) {
      console.error("❌ Error fetching problems:", error);
    }
  };

  const startRecording = () => {
    if (isSpeaking) {
      return;
    }

    setIsRecording(true);
    // Create a new SpeechRecognition instance and configure it
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    // Event handler for speech recognition results
    recognitionRef.current.onresult = (event) => {
      const { transcript } = event.results[event.results.length - 1][0];

      setTranscript(transcript);

      if (event.results[event.results.length - 1].isFinal) {
        const currentTime = new Date();
        setTimeLeft(25 - (currentTime - interviewStartTime) / (1000 * 60))

        getResponseFromModel(
          event.results[event.results.length - 1][0].transcript
        );
        // handleTextToSpeech(response);
        console.log("here");
      }
    };

    // Start the speech recognition
    recognitionRef.current.start();

    recognitionRef.current.onerror = async (event) => {
      setError(event.error);
      
      if (event.error == "not-allowed") {
        alert("Please allow microphone to continue the interview");
        return;
      }
      if (event.error == "no-speech" || event.error == "aborted") {
        console.log("end listening");
        // ask the bot to repeat the question
        const response = await axios.post(
          "/api/bot",
          {
            userResponse:
              "repeat the question you asked as the user didn't respond",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // handleToggleRecording();
        handleTextToSpeech(response.data);
      }
      handleToggleRecording();
      recognitionRef.current.stop();
    };
  };

  function changeLanguageOfTheSolution(data) {
    // changes the language of the solution as well 
    if (codingLanguage == "python") {
      setSolution(data.python);
    } else if (codingLanguage == "c++") {
      setSolution(data["c++"]);
    } else if (codingLanguage == "javascript") {
      setSolution(data.javascript);
    } else {
      setSolution(data.java);
    }
  }

  function changeCodingLanguage(language) {
    // for changing the language
    // no button yet to trigger and this hasnt been tested
    setCodingLanguage(language)
    getDataFromDatabase();
  }

  useEffect(() => {
    const id = localStorage.getItem("sessionId");  

    // making sure the user is logged in before the interview session
    if (!id){
      redirect("/login");
    }

    // get user details
    updateUserExperienceLevel(id);

    // fetch the data from database
    getDataFromDatabase(id);
  }, []);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    if (Array.isArray(voices) && voices.length > 0) {
      setVoices(voices);
      return;
    }
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = function () {
        const voices = window.speechSynthesis.getVoices();
        setVoices(voices);
      };
    }
  }, []);

  const handleTextToSpeech = async (text) => {
    if (isRecording){
      return;
    }

    if (recognitionRef.current) {
      // Stop recording while speech synthesis is speaking
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.voice = voices[1];

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    // Restart recording when speech synthesis ends
    utterance.onend = () => {
      setIsSpeaking(false);
      if (!isRecording) {
        startRecording();
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const getResponseFromModel = async (text) => {
    var response = "";
    console.log("User response: ", transcript);
    async function waitForResponse() {
      response = await axios.post(
        "/api/bot",
        {
          userResponse: text,
          codingQuestion: question,
          modelSolution: solution,
          usersCode: codeRef.current,
          timeLeft: minutes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    await waitForResponse();
    console.log(response.data);
    handleTextToSpeech(response.data);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      // Stop the speech recognition and mark recording as complete
      recognitionRef.current.stop();
      setRecordingComplete(true);
    }
  };

  // Toggle recording state and manage recording actions
  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  const startInterview = async () => {
    const response = await axios
      .post(
        "/api/bot",
        {
          userResponse: "begin the interview",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => r);

    console.log("response: ", response.data);
    setStart(true);
    startTimer();
    const startTime = new Date();
    setInterviewStartTime(startTime);
    setInterviewStarted(true);
    handleTextToSpeech(response.data);
    // handleToggleRecording();
  };

  const handleEndInterview = async () => {
    const endingPrompt = "end the interview";
    handleToggleRecording();

    const response = await axios
      .post(
        "/api/bot",
        {
          userResponse: endingPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((r) => r);

    const result = response.data;
    console.log("result: ", result);

    setResultsData(result);
    setInterviewEnded(true);
    setIsRecording(false);
    setIsSpeaking(false);
    endSpeechAndListening();

    setTimeLeft(25 - (new Date() - interviewStartTime) / (1000 * 60));
  };

  const { minutes, seconds, startTimer } = useCountdownTimer(
    25,
    handleEndInterview
  );

  const handleCodeUpdate = (newCode) => {
    setCodeWritten(newCode);
    codeRef.current = newCode; // Update ref for immediate access

  };

  const endSpeechAndListening = () => {
    // Stop speech recognition if it's active
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      console.log("Speech recognition stopped.");
    }
    // Cancel any ongoing speech synthesis
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      console.log("Speech synthesis cancelled.");
    }
  }

  useEffect(() => {
  return () => {
    endSpeechAndListening();
  };
}, []);

  return (
    <div className="h-[90vh]">
      <StartInterviewPopUp startInterview={startInterview}/>
      {interviewEnded && resultsData && <DisplayResults resultsData={resultsData} timeLeft={minutes} difficulty={difficulty} questionID={questionID}/>}
      <Toolbar handleEndInterview={handleEndInterview} minutes={minutes} seconds={seconds} isRecording={isRecording} isSpeaking={isSpeaking}/>
      <div className="h-full flex flex-col lg:flex-row bg-[#151515] space-x-2 max-lg:gap-4">
        <QuestionPanel question={question} />
        <MonacoEditor setCodeWritten={handleCodeUpdate} />
      </div>
    </div>
  );
};

export default page;
