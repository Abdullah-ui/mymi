import { doc, getDoc, updateDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { firestore } from "../../../../firebase";

const DisplayResults = ({ resultsData, timeLeft, difficulty, questionID }) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    redirect("/dashboard");
  };

  const getUsersData = async () => {
    // get users information from the database
    const id = localStorage.getItem("sessionId");

    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data;
    } else {
      console.log("error fetching the data");
      return null;
    }
  };

  const addDataToTheDatabase = async () => {
  try {
    const user = await getUsersData();
    
    if (!user) {
      console.error("No user data found");
      return;
    }

    if (!resultsData) {
      console.error("No results data found");
      return;
    }

    // Safely get array properties with fallback to empty arrays
    const userAreasOfImprovement = Array.isArray(user.areasOfImprovement) ? user.areasOfImprovement : [];
    const resultAreasOfImprovement = Array.isArray(resultsData.areasOfImprovement) ? resultsData.areasOfImprovement : [];
    const userStrengths = Array.isArray(user.strengths) ? user.strengths : [];
    const resultStrengths = Array.isArray(resultsData.strengths) ? resultsData.strengths : [];
    const userWeaknesses = Array.isArray(user.weaknesses) ? user.weaknesses : [];
    const resultWeaknesses = Array.isArray(resultsData.weaknesses) ? resultsData.weaknesses : [];

    // Safely calculate efficiency with fallback to 0
    const userEfficiency = typeof user.efficiency === 'number' ? user.efficiency : 0;
    const resultOverall = resultsData.results?.overall || 0;
    const newEfficiency = (userEfficiency + resultOverall) / 2;

    // Safely handle interview count
    const currentInterviewCount = typeof user.finishedInterviewCount === 'number' ? user.finishedInterviewCount : 0;
    const newInterviewCount = currentInterviewCount + 1;

    // Safely handle time taken
    const currentTimeTaken = user.timeTakenInterviewing ? user.timeTakenInterviewing : 0;
    const newTimeTaken = currentTimeTaken + (25 - timeLeft);

    // Safely handle typesOfQuestionsSolved
    const typesOfQuestionsSolved = user.typesOfQuestionsSolved || {};
    const currentDifficultyCount = typeof typesOfQuestionsSolved[difficulty] === 'number' ? typesOfQuestionsSolved[difficulty] : 0;
    
    const dataToBeUpdated = {
      areasOfImprovement: [...new Set([...resultAreasOfImprovement, ...userAreasOfImprovement])],
      efficiency: newEfficiency,
      finishedInterviewCount: newInterviewCount,
      performancePerInterview: {
        ...(user.performancePerInterview || {}),
        [questionID]: resultsData
      },
      strengths: [...new Set([...resultStrengths, ...userStrengths])],
      timeTakenInterviewing: newTimeTaken,
      typesOfQuestionsSolved: {
        ...typesOfQuestionsSolved,
        [difficulty]: currentDifficultyCount + 1
      },
      weaknesses: [...new Set([...resultWeaknesses, ...userWeaknesses])],
    };

    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      console.error("No session ID found");
      return;
    }

    const docRef = doc(firestore, "users", sessionId);
    await updateDoc(docRef, dataToBeUpdated);
    
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

  useEffect(() => {
    addDataToTheDatabase();
  }, [resultsData]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Interview Results
                </h2>
                <button
                  onClick={togglePopup}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Overall Score */}
              <div className="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  Overall Score
                </h3>
                <div className="flex items-center">
                  <div className="text-5xl font-bold text-blue-400 mr-4">
                    {resultsData.results.overall}%
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{ width: `${resultsData.results.overall}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Skills Breakdown */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {Object.entries(resultsData.results)
                  .filter(([key]) => key !== "overall")
                  .map(([skill, score]) => (
                    <div
                      key={skill}
                      className="bg-gray-800 p-3 rounded-lg border border-gray-700"
                    >
                      <div className="text-sm font-medium text-gray-400 capitalize">
                        {skill.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="text-xl font-bold text-white">
                        {score}/10
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            score >= 8
                              ? "bg-green-500"
                              : score >= 6
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${score * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-green-900">
                  <h3 className="font-semibold text-green-400 mb-2">
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {resultsData.strengths?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-red-900">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Weaknesses
                  </h3>
                  <ul className="space-y-2">
                    {resultsData.weaknesses?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">✗</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-yellow-900">
                  <h3 className="font-semibold text-yellow-400 mb-2">
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {resultsData.areasOfImprovement?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-500 mr-2">↻</span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayResults;
