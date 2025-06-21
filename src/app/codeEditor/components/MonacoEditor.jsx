"use client";
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import MonacoCustomLanguages from "./MonacoCustomLanguages"

const MonacoEditor = ({ setCodeWritten }) => {
  const [code, setCode] = useState("# Write your code here!");

  const handleEditorChange = (value) => {
    setCode(value);
    if (setCodeWritten) {
      setCodeWritten(value); // Exporting updated code
    }
  };

  return (
    // <div className="lg:w-1/2 min-h-[50vh] rounded-lg bg-[#1e1e1e]">
    //   <div className="pt-5 px-5 h-full">
    //     <Editor
    //       height="90%"
    //       defaultLanguage="python"
    //       defaultValue="# Write your code here!"
    //       theme="vs-dark"
    //       value={code}
    //       onChange={handleEditorChange}
    //       language=""
    //     />
    //   </div>
    // </div>
    <MonacoCustomLanguages/>
  );
};

export default MonacoEditor;
