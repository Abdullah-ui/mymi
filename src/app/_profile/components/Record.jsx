"use client";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const Record = () => {
  const [year, setYear] = useState(2023);
  const [showYearList, setShowYearList] = useState(false);
  return (
    <div className="flex mt-[40px] space-x-10">
      <div className="bg-[#09080F] p-[50px] rounded-3xl">
        <h3 className="text-xl font-semibold mb-[30px]">Achievements</h3>
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-[#502474] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#EE8888] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#607A4A] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#B2A957] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#EB3CA5] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#704B4B] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#FF68C8] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#461919] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#DB72A8] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#FFADD7] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#F255B3] h-[60px] w-[60px] rounded-full" />
          <div className="bg-[#FF8DD5] h-[60px] w-[60px] rounded-full" />
        </div>
      </div>
      <div className="bg-[#0B101C] p-[50px] rounded-3xl">
        <div className="flex items-center justify-between mb-[30px]">
          <h3 className="text-xl font-semibold">150 Interviews this year</h3>
          <div className="relative">
            <button
              className="flex items-center space-x-3 bg-[#111F32] py-2 px-3 rounded-xl"
              onClick={() => setShowYearList(!showYearList)}
            >
              <p className="font-semibold">{year}</p>
              <BsChevronDown
                className={`w-[12px] transition-transform duration-300 ease-in-out ${
                  showYearList ? "rotate-180" : ""
                }`}
              />
            </button>
            {showYearList && (
              <div className="absolute top-12 rounded-xl bg-[#111F32] py-4 px-6 flex flex-col space-y-2">
                <button onClick={() => {setYear(2025), setShowYearList(false)}}>2025</button>
                <button onClick={() => {setYear(2024), setShowYearList(false)}}>2024</button>
                <button onClick={() => {setYear(2023), setShowYearList(false)}}>2023</button>
                <button onClick={() => {setYear(2022), setShowYearList(false)}}>2022</button>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(36, minmax(0, 1fr))`,
            gap: `4px`,
          }}
        >
          {Array.from({ length: 252 }, (_, index) => (
            <div key={index} className="bg-[#292B2D] h-[13.7px] w-[13.7px]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Record;
