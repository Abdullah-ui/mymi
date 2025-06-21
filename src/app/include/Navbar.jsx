"use client";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../../firebase"
import ProfileDropdown from "./ProfileDropdown"
import { doc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const getDataFromDatabase = async (id) => {
    if (!id) return
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return data
    }
  }


  useEffect(() => {
    let wholeData = {}
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      wholeData = { ...firebaseUser }
    });
    const fetchData = async () => {
      const id = localStorage.getItem("sessionId");
      const someData = await getDataFromDatabase(id);
      setUserData(({ ...wholeData, ...someData }));
    }
    fetchData()
    return () => unsubscribe(); // cleanup
  }, []);

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    setMenuOpen(false);
    setLoggedIn(!!sessionId);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    router.push("/home");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex justify-between items-center mt-8">
      <div className="flex items-center space-x-4 z-10">
        <div
          className={`hamburger-menu flex flex-col lg:hidden cursor-pointer ${menuOpen ? "active" : ""
            }`}
          onClick={toggleMenu}
        >
          <span className="hamburger-line bg-[#EB7830] mb-1"></span>
          <span className="hamburger-line bg-[#EB7830] mb-1"></span>
          <span className="hamburger-line bg-[#EB7830]"></span>
        </div>
        <h1 className="text-5xl max-md:text-4xl font-semibold">
          <Link href="/">mymi</Link>
        </h1>
      </div>
      <div className="space-x-7 max-lg:hidden max-lg:space-x-4">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contacts</Link>
        <Link href="/faqs">FAQ's</Link>
      </div>

      <div
        className={`sidebar-menu flex lg:hidden ${menuOpen ? "opened" : ""}`}
      >
        <Link href="/" className="mt-24">
          Home
        </Link>
        <Link href="/about">About</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/contact">Contacts</Link>
        <Link href="/faqs">FAQ's</Link>
      </div>
      {/* {!loggedIn ? (
        <div className="space-x-6 max-sm:space-x-4 font-semibold">
          <Link href="/login">login</Link>
          <Link href="/signup" className="bg-[#EB7830] py-2 px-4 rounded-full">
            Sign Up
          </Link>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-[#EB7830] py-2 px-4 rounded-full"
        >
          Logout
        </button>
      )} */}
      {!loggedIn && (
        <div className="space-x-6 max-sm:space-x-4 font-semibold">
          <Link href="/login">login</Link>
          <Link href="/signup" className="bg-[#EB7830] py-2 px-4 rounded-full">
            Sign Up
          </Link>
        </div>
      )}
      {userData && loggedIn && <ProfileDropdown userData={userData} handleLogout={handleLogout} />}
    </nav>
  );
}


