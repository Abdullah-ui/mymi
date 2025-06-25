"use client";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";

const Footer = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUserData(firebaseUser);
    });
    return () => unsubscribe(); // cleanup
  }, []);
  return (
    <footer className="flex max-xl:flex-col items-start xl:items-center justify-between py-16 xl:py-32 max-xl:pb-12 mt-0">
      <div className="space-y-10 flex max-[516px]:flex-col lg:block mb-16 xl:mb-0 max-[516px]:items-start max-xl:items-center max-lg:justify-between max-lg:w-full">
        <div>
          <div className="w-28 h-28">
            <img
              src="/images/logo.png"
              width="100%"
              height="100%"
              // style={{ display: "block" }}
            />
          </div>
          {!userData && (
            <>
              <p className="max-w-[360px]">
                Sign up for a free MYMI account and start coding today!
              </p>
              <form
                action={async () => {
                  redirect("/signup");
                }}
              >
                <button
                  type="submit"
                  className="bg-[#02B94D] rounded-full px-6 lg:px-4 py-3 lg:py-2 font-semibold text-lg"
                >
                  Sign Up
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-5 xl:flex-row max-xl:w-full max-xl:px-1 max-xl:pt-12 xl:space-x-10">
        <div className="space-y-3 xl:space-y-5 text-nowrap">
          <h5 className="font-bold text-2xl xl:text-xl mb-3 xl:mb-12">
            Platform Features
          </h5>
          <div className="flex flex-col gap-y-5">
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Mock Interview
            </Link>
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Practice Problems
            </Link>
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Progress Tracking
            </Link>
          </div>
        </div>
        <div className="space-y-3 xl:space-y-8 text-nowrap max-xl:mt-10">
          <h5 className="font-bold text-2xl xl:text-xl mb-3 xl:mb-12">
            Resources & Learning
          </h5>
          <div className="flex flex-col gap-y-5">
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Interview Tips
            </Link>
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Coding Best Practices
            </Link>
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Programming Guides
            </Link>
            <Link
              href=""
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Sample Questions
            </Link>
          </div>
        </div>
        <div className="space-y-3 xl:space-y-8 text-nowrap max-xl:mt-10">
          <h5 className="font-bold text-2xl xl:text-xl mb-3 xl:mb-12">
            About Us
          </h5>
          <div className="flex flex-col gap-y-5">
            <Link
              href="/about"
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Contact
            </Link>
            <Link
              href="/faqs"
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              FAQ's
            </Link>
          </div>
        </div>
        <div className="space-y-3 xl:space-y-8 text-nowrap max-xl:mt-10">
          <h5 className="font-bold text-2xl xl:text-xl mb-3 xl:mb-12">
            Account & Support
          </h5>
          <div className="flex flex-col gap-y-5">
            <Link
              href="/dashboard"
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              My Profile
            </Link>
            <Link
              href="/dashboard"
              className="hover:underline hover:text-blue-600 transition-all duration-200"
            >
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
