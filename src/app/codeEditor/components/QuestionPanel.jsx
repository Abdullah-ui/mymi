import React from "react";
import ReactMarkdown from 'react-markdown';

const QuestionPanel = ({ question }) => {
  return (
    <div className="lg:w-1/2 bg-[#1e1e1e] rounded-lg">
      <div className="p-5 overflow-y-auto h-[100%] scrollbar-hide">
        <ReactMarkdown>{question}</ReactMarkdown>
      </div>
    </div>
  );
};

export default QuestionPanel;
