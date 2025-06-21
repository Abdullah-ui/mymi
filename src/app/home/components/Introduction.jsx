"use client";
import Image from "next/image";
import { redirect } from "next/navigation";

const Introduction = () => {
  return (
    <div className="flex flex-col items-center text-center mt-[95px] mb-[105px]">
      <h2 className="text-6xl mb-[35px] font-normal max-md:text-[40px] max-md:mb-[10px]">
        Transform your potential into confidence
      </h2>
      <p className="text-[28px] mb-[51px] max-md:text-[18px] max-md:mb-[24px]">
        Delve into AI Powered Technical Interview Practice, enhancing both the
        technical skills while focusing on soft skills simultaneously.
      </p>
      <button onClick={() => {redirect("/codeEditor")}} className="bg-[#337356] mb-[95px] text-2xl py-3 px-12 rounded-full max-md:text-[18px] max-md:py-1.5 max-md:px-4">
        Start New Interview
      </button>
      <Image
        src="/images/code_editor_home.png"
        alt="Code Editor"
        width={1440}
        height={1440}
      />
    </div>
  );
};

export default Introduction;
