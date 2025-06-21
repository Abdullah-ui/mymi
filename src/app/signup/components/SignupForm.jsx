import Link from "next/link";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  auth,
  createUserWithEmailAndPassword,
  firestore,
} from "../../../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addToTheDatabase = async (data, id) => {
    const userDocRef = doc(firestore, "users", id);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      return;
    }

    try {
      await setDoc(userDocRef, data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const signUp = async () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError({ message: "Please fill in all fields" });
      setLoading(false);
      return null;
    }
    if (password !== confirmPassword) {
      setError({ message: "Passwords do not match" });
      setLoading(false);
      return null;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // localStorage.setItem("sessionId", user.reloadUserInfo.localId);
        localStorage.setItem("sessionId", user.uid);
      }

      await sendEmailVerification(user);

      return user;
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError({ message: "Email already in use" });
      } else if (
        error.message ===
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        setError({ message: "Password should be at least 6 characters" });
      } else {
        setError({ message: "Failed to Sign Up. Please try again." });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await signUp();

    if (user) {
      const username = email.split("@")[0];
      const id = user.uid;

      const data = {
        name: firstName + " " + lastName,
        email: email,
        areasOfImprovement: "",
        efficiency: 0,
        finishedInterviewCount: 0,
        performancePerInterview: {},
        profilePicture: "https://cdn.pfps.gg/pfps/2301-default-2.png",
        strengths: "",
        timeTakenInterviewing: 0,
        username: username,
        weaknesses: "",
		about: "",
		bio: "",
        typesOfQuestionsSolved: {
          easy: 0,
          medium: 0,
          hard: 0,
        },
      };

      await addToTheDatabase(data, id);
      router.push("/dashboard/" + id);
      setLoading(false);
    }
  };

  const checkIfAlreadyLoggedIn = () => {
    try {
      // const response = localStorage.getItem("sessionId");
      const id = localStorage.getItem("sessionId");

      if (id) {
        router.push("/dashboard/" + id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfAlreadyLoggedIn();
  }, []);

  return (
    <form action="" className="space-y-4">
      <div className="flex flex-col md:flex-row max-md:justify-center md:items-center md:space-x-8 max-md:space-y-3">
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="firstName"
            className="sm:font-semibold text-base sm:text-lg"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="e.g John"
            required
            className="bg-transparent border border-[#7187A2] rounded-xl py-2 px-6 md:w-[190px] focus:outline-none"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="lastName"
            className="sm:font-semibold text-base sm:text-lg"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="e.g Francisco"
            required
            className="bg-transparent border border-[#7187A2] rounded-xl py-2 px-6 md:w-[190px] focus:outline-none"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="email"
          className="sm:font-semibold text-base sm:text-lg"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="eg. johnfrans@gmail.com"
          required
          className="bg-transparent border border-[#7187A2] rounded-xl py-2 px-6 w-full focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="password"
          className="sm:font-semibold text-base sm:text-lg"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          className="bg-transparent border border-[#7187A2] rounded-xl py-2 px-6 w-full focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="confirmPassword"
          className="sm:font-semibold text-base sm:text-lg"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          required
          className="bg-transparent border border-[#7187A2] rounded-xl py-2 px-6 w-full focus:outline-none"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (e.target.value !== password) {
              setError({ message: "Passwords do not match" });
            } else {
              setError(null);
            }
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center justify-center bg-white text-black py-3 w-full rounded-xl disabled:opacity-50"
      >
        Sign Up
        {loading && (
          <div className="ml-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          </div>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-center">
          {error.message || "Failed to Sign Up. Please try again."}
        </p>
      )}
      <p className="text-[#8d8d8d] text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-white font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
