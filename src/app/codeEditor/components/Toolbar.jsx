import { useState } from "react";
import { GiSoundWaves } from "react-icons/gi";
import { TiMicrophoneOutline } from "react-icons/ti";
import InterviewEndConfirmation from "./InterviewEndConfirmation";

const Toolbar = ({ handleEndInterview, minutes, seconds, isRecording, isSpeaking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {isOpen ? setIsOpen(false) : setIsOpen(true);};

  return (
    <div className="bg-[#151515] p-1 md:p-3 flex justify-between">
      <button onClick={toggleModal} className="bg-[#F03A14] py-2 px-4 rounded-lg">
        End <span className="hidden md:block">Interview</span>
      </button>
      {isOpen && <InterviewEndConfirmation isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center px-12 md:px-32 py-2 md:bg-[#2F2F2F] rounded-lg">
          <p className="font-semibold">MYMI</p>
          {isSpeaking ? (<GiSoundWaves className="w-[30px] h-[30px] absolute right-4 animate-speaking" />) : (<GiSoundWaves className="w-[30px] h-[30px] absolute right-4" />)}
        </div>
        {!isRecording ? (
          <TiMicrophoneOutline className="w-[30px] h-[30px]" />
        ) : (
          <TiMicrophoneOutline className="w-[30px] h-[30px] glow-animate" />
        )}{" "}
      </div>
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center text-white font-semibold py-2 px-4 rounded-lg">
          {minutes < 10 ? f`0${minutes}` : minutes} :{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <button
          onClick={handleEndInterview}
          className="bg-[#00B94D] py-2 px-6 rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
