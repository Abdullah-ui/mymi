"use client";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { LuAlarmClock } from "react-icons/lu";
import { IoStatsChartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../../../firebase";
import { redirect } from "next/navigation";
import EditableAboutSection from "./about"

const Introduction = ({ userData }) => {
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();
  // const [userData, setUserData] = useState(null);

  // const getDataFromDatabase = async () => {
  //   const id = localStorage.getItem("sessionId");

  //   const docRef = doc(firestore, "users", id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     const data = docSnap.data();
  //     setUserData(data)
  //   }
  // }

  // useEffect(() => {
  //   const id = localStorage.getItem("sessionId");
  //   getDataFromDatabase();

  //   if (!id) {
  //     router.push("/login");
  //   }
  // }, [])

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-0 lg:justify-between mt-[40px] lg:mt-[95px]">
      <div>
        <div className="space-y-2 mb-5">
          <h1 className="text-2xl lg:text-4xl">Hello, {userData?.name.split(' ')[0] || ""}</h1>
          <p className="!mb-5 text-sm lg:text-base">Track team progress here. You almost reach a goal!</p>
          {/* <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl max-w-[530px]">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowAbout(!showAbout)}
            >
              <h3 className="text-lg font-semibold">About</h3>
              <span className="text-sm">{showAbout ? "Hide" : "Show"}</span>
            </div>
            {showAbout && (
              <p className="mt-4">
                {userData?.about || ""}
              </p>
            )}
          </div> */}
          <EditableAboutSection about={userData?.about || ""} />
        </div>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
          <div className="bg-white/10 backdrop-blur-md px-5 lg:px-7 py-4 rounded-xl flex items-center gap-4">
            <FiThumbsUp className="w-[30px] h-[30px]" />
            <div>
              <p className="text-sm lg:text-base">Finished</p>
              <p className="text-xs text-neutral-300">{userData?.finishedInterviewCount}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl flex items-center gap-4">
            <LuAlarmClock className="w-[30px] h-[30px]" />
            <div>
              <p className="text-sm mlgd:text-base">Tracked</p>
              <p className="text-xs text-neutral-300">{userData?.timeTakenInterviewing}</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-7 py-6 rounded-xl flex items-center gap-4">
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
          <p className="text-2xl max-lg:text-lg font-semibold">{userData?.name}</p>
          <p className="text-sm text-neutral-300">@{userData?.username}</p>
          <button onClick={() => { redirect("/codeEditor") }} className="bg-[#337356] mt-5 py-3 px-12 rounded-full max-md:text-[18px] max-md:py-1.5 max-md:px-4">
            Start New Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
