"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { generateInterviewData, options } from "./index";
import axios from "axios";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Performance = ({ userData }) => {
  const [series] = useState(generateInterviewData);
  const [suggestions, setSuggestions] = useState([]);
  const calledRef = useRef(false);

  const getSuggestions = async () => {
    try {
      console.log("Fetching suggestions for user:", await userData);
      const response = await axios.post(
        "/api/suggestions",
        {
          data: userData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      console.log(result);
      setSuggestions(result);
    } catch (error) {
      console.log(error);
    }

    // setSuggestions( [
    //   "Working on Leetcode Problem Set 1110",
    //   "Working on improving the way you are speaking directly.",
    //   "Explaining your approach in a more systematic manner."
    // ]);
  };

  useEffect(() => {
    if (userData && !calledRef.current) {
      getSuggestions();
      calledRef.current = true;
    }
  }, [userData]);

  return (
    <div className="mt-20" suppressHydrationWarning>
      <div>
        <h3 className="text-3xl font-semibold mb-10">Performance</h3>
        <Chart options={options} series={series} type="area" height={450} />
      </div>
      <div className="mt-20">
        <h3 className="text-3xl font-semibold mb-10">Suggestions</h3>
        <div className="w-full space-y-3">
          {suggestions.map((suggestion, index) => (
            <p
              key={index}
              className="text-center text-xl px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl"
            >
              {suggestion}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Performance;
