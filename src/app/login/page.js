"use client";
import Link from "next/link";
import Introduction from "./components/Introduction";
import LoginForm from "./components/LoginForm";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const handleBack = () => {
    try {
      router.back();
    } catch (error) {
      console.error("Error navigating back:", error);
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-0 flex space-x-2 z-10">
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full backdrop-blur-sm transition-all duration-200 text-white hover:scale-105"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <Link
          href="/home"
          className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full backdrop-blur-sm transition-all duration-200 text-white hover:scale-105"
          aria-label="Go home"
        >
          <Home size={20} />
        </Link>
      </div>

      <section className="flex items-center justify-center h-[85vh] md:h-screen">
        <div className="flex flex-col items-center bg-black bg-opacity-50 w-[85%] max-w-[600px] md:w-[65%] lg:w-[48%] py-10 rounded-tr-xl rounded-2xl backdrop-blur-sm">
          <Introduction />
          <LoginForm />
        </div>
      </section>
    </div>
  );
};

export default page;
