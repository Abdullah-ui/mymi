"use client";
import Introduction from "./components/Introduction";
import LoginForm from "./components/LoginForm";

const page = () => {
  return (
    <section className="flex items-center justify-center h-[85vh] md:h-screen">
        <div className="flex flex-col items-center bg-black bg-opacity-50 w-[85%] max-w-[600px] md:w-[65%] lg:w-[48%] py-10 rounded-tr-xl rounded-2xl">
          <Introduction />
          <LoginForm />
        </div>
    </section>
  );
};

export default page;
