import { sendEmailVerification, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, githubProvider, googleProvider } from "../../../../firebase";
import { useRouter } from "next/navigation";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signInWithEmailPassword = async() => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!(user.emailVerified)){
        await sendEmailVerification(user);
        throw new Error("Email not verified.");
      }

      return user;
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setError({message: "Please enter a valid email and password"});
        return;
      }
      if (error.message === "Email not verified."){
        setError({message: "Please check your inbox for the email verification link."});
        return;
      }
    }
  }

  const handleSubmit = async(e) => {
   setError(null);
   setLoading(true);

   if (!email || !password) {
      setError({ message: "Please fill in all fields" });
      setLoading(false);
      return null;
   }

    e.preventDefault();
    
    const user = await signInWithEmailPassword();

    if (user){
      // handle routing to the dashboard
      const id = user.uid;
      
      localStorage.setItem("sessionId", id);

      router.push('/dashboard/' + id);
    } 
    setLoading(false);
  }

  const logInWithGithub = async(e) => {
    setError(null);

    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      localStorage.setItem("sessionId", user.uid);

      router.push('/dashboard/' + user.uid);
    } catch (error){
      setError(error);
    }
  }

  const logInWithGoogle = async(e) => {
    setError(null);

    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem("sessionId", user.uid);

      router.push('/dashboard/' + user.uid);
    } catch (error){
      setError(error);
    }
  }

  const checkIfAlreadyLoggedIn = () => {
    const id = localStorage.getItem("sessionId");
    if (id){
      router.push('/dashboard/' + id);
    }
  }

  useEffect(() => {
    checkIfAlreadyLoggedIn();
  }, [])

  return (
    <form action="" className="space-y-4 md:space-y-6">
      <div className="flex flex-col space-y-2">
        <label htmlFor="email" className="font-semibold text-lg">
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
        <label htmlFor="password" className="font-semibold text-lg">
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
          <button type="submit" onClick={handleSubmit} disabled={loading} className="flex items-center justify-center bg-white text-black py-3 w-full rounded-xl">
            Login
            {loading && (
              <div className="ml-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
              </div>
            )}
          </button>
      <div className="flex items-center">
        <hr className="w-[130px] md:w-[160px] xl:w-[180px] h-px my-8 bg-white border-0" />
        <span className="mx-2">or</span>
        <hr className="w-[130px] md:w-[160px] xl:w-[180px] h-px my-8 bg-white border-0" />
      </div>
      <div className="text-center space-y-5 md:space-y-8">
        <h4 className="text-xl">Log In Using</h4>
        <div className="flex justify-center space-x-3 md:space-x-5">
          <button onClick={logInWithGoogle} className="flex items-center space-x-2 border-[0.2px] border-[#504f4f] rounded-xl px-6 md:px-10 xl:px-14 py-2">
            <Image
              src="/images/google_signup.png"
              width={18}
              height={18}
              alt="Google logo"
            />
            <span className="font-semibold text-lg">Google</span>
          </button>
          <button onClick={logInWithGithub} className="flex items-center space-x-2 border-[0.2px] border-[#504f4f] rounded-xl px-6 md:px-10 xl:px-14 py-2">
            <Image
              src="/images/github_signup.png"
              width={18}
              height={18}
              alt="Google logo"
            />
            <span className="font-semibold text-lg">Github</span>
          </button>
        </div>
      </div>
      {error? <p className="text-center text-red-500">{error.message}</p> : null}
      <p className="text-[#8d8d8d] text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="text-white font-semibold">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
