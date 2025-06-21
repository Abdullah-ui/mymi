'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { generateInterviewData, options } from "./index"

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });



const Performance = () => {
  const [series] = useState(generateInterviewData)
  return (
    <div className="mt-20" suppressHydrationWarning>
      <div>
        <h3 className="text-3xl font-semibold mb-10">Performance</h3>
        <Chart
          options={options}
          series={series}
          type="area"
          height={450}
        />
      </div>
      <div className="mt-20">
        <h3 className="text-3xl font-semibold mb-10">Suggestions</h3>
        <div className="w-full space-y-3">
          <p className="text-center text-xl px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl">Working on Leetcode Problem Set 1110</p>
          <p className="text-center text-xl px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl">Working on improvioving the way you are speaking directly.</p>
          <p className="text-center text-xl px-6 py-4 bg-white/10 backdrop-blur-md rounded-xl">Explaining your approach in a more systematic manner.</p>
        </div>
      </div>
    </div>
  );
};

export default Performance;
