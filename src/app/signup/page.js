"use client"
import React from 'react'
import Introduction from './components/Introduction';
import SignupForm from './components/SignupForm';

const page = () => {
    return (
      <section className="flex items-center justify-center h-[95vh] md:h-screen max-sm:mt-28 max-sm:mb-28">
        <div className="flex flex-col items-center bg-black bg-opacity-50 w-full max-sm:max-w-full max-w-[600px] md:w-[75%] lg:w-[60%] xl:w-[50%] py-10 rounded-tr-xl rounded-2xl">
              <Introduction />
              <SignupForm />
        </div>
    </section>
      );
}

export default page