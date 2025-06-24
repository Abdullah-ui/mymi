import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { LuAlarmClock } from "react-icons/lu";
import { IoStatsChartOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
import EditableAboutSection from "./about"
import ExperienceLevel from "./chip"

const Introduction = ({ userData }) => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-0 lg:justify-between mt-[40px] lg:mt-[95px]">
      <div>
        <div className="space-y-2 mb-5">
          <h1 className="text-2xl lg:text-4xl">Hello, {userData?.name.split(' ')[0] || ""}</h1>
          <p className="!mb-5 text-sm lg:text-base">Experience mapped. Progress measured. Goals within reach</p>
          <EditableAboutSection about={userData?.about || ""} />
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
          <div className="bg-white/10 backdrop-blur-md px-7 py-4 rounded-xl flex items-center gap-4 flex-1">
            <FiThumbsUp className="w-[30px] h-[30px]" />
            <div>
              <p className="text-sm lg:text-base">Finished</p>
              <p className="text-xs text-neutral-300">{userData?.finishedInterviewCount}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl flex items-center gap-4 flex-1">
            <LuAlarmClock className="w-[30px] h-[30px]" />
            <div>
              <p className="text-sm mlgd:text-base">Tracked</p>
              <p className="text-xs text-neutral-300">{userData?.timeTakenInterviewing}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl flex items-center gap-4 flex-1">
            <IoStatsChartOutline className="w-[30px] h-[30px]" />
            <div>
              <p className="text-sm lg:text-base">Efficiency</p>
              <p className="text-xs text-neutral-300">{userData?.efficiency}%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 mt-5 max-lg:w-[145px]">
        <Image
          src={userData?.profilePicture || "/images/user_dashboard.png"}
          alt="Profile Image"
          className="rounded-full w-full"
          width={140}
          height={140}
        />
        <div className="flex flex-col items-center">
          <p className="text-2xl max-lg:text-lg text-center font-semibold">{userData?.name}</p>
          <p className="text-sm text-neutral-300">@{userData?.username}</p>
          <ExperienceLevel level={userData?.experienceLevel || "beginner"} />
          <button onClick={() => { redirect("/codeEditor") }} className="bg-[#337356] py-3 px-12 rounded-full max-md:text-[18px] max-md:py-1.5 max-md:px-4 flex-1">
            Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
