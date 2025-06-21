import Image from "next/image";
import { useState, useEffect } from "react";
import {
	auth,
	googleProvider,
	githubProvider,
	signInWithPopup,
	firestore,
} from "../../../../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Introduction = () => {
	const [error, setError] = useState(null);
	const router = useRouter();

	const addToTheDatabase = async (data, id) => {
		const userDocRef = doc(firestore, "users", id);
		const userDocSnap = await getDoc(userDocRef);

		if (userDocSnap.exists()) {
			return;
		}

		try {
			await setDoc(doc(firestore, "users", id), data);
		} catch (error) {
			setError(error);
		}
	};

	const signInWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider)
			.then((result) => {
				console.log(result.user);
				const response = result.user;

				if (response) {
					// localStorage.setItem("sessionId", response.reloadUserInfo.localId);
					localStorage.setItem("sessionId", response.uid);
				}

				const id = response.uid;
				const name = response.displayName;
				const email = response.email;
				const pfp = response.photoURL;
				const username = response.email.split("@")[0];

				const data = {
					name: name,
					email: email,
					areasOfImprovement: "",
					efficiency: 0,
					finishedInterviewCount: 0,
					performancePerInterview: {},
					profilePicture: pfp,
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

				addToTheDatabase(data, id);

				router.push("/dashboard/" + id);
			})
			.catch((error) => {
				if (error.message === "auth/account-exists-with-different-credential") {
					router.push("/login");
				}
				setError(error);
			});
	};

	const signInWithGithub = async () => {
		await signInWithPopup(auth, githubProvider)
			.then((result) => {
				console.log(result.user);

				const response = result.user;

				if (response) {
					// localStorage.setItem("sessionId", user.reloadUserInfo.localId);
					localStorage.setItem("sessionId", user.uid);
				}

				const id = response.uid;
				const name = response.displayName || "";
				const email = response.email || "";
				const pfp = response.photoURL;
				const username = response.email
					? response.email.split("@")[0]
					: response.uid;

					const data = {
						name: name,
						email: email,
						areasOfImprovement: "",
						efficiency: 0,
						finishedInterviewCount: 0,
						performancePerInterview: {},
						profilePicture: pfp,
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

				addToTheDatabase(data, id);

				router.push("/dashboard/" + id);
			})
			.catch((error) => {
				if (error.message === "auth/account-exists-with-different-credential") {
					router.push("/login");
				}
				setError(error);
			});
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
		<div>
			<div className="text-center space-y-1 mb-7">
				<h1 className="text-2xl font-semibold mb-2">Sign Up Account</h1>
				<p>Enter your personal data to create your account.</p>
			</div>
			<div className="flex justify-center max-sm:flex-col max-sm:items-center max-sm:space-y-3 sm:space-x-5">
				<button
					onClick={signInWithGoogle}
					className="flex items-center space-x-2 border-[0.2px] border-[#504f4f] rounded-xl px-6 md:px-14 py-2"
				>
					<Image
						src="/images/google_signup.png"
						width={18}
						height={18}
						alt="Google logo"
					/>
					<span className="font-semibold text-sm sm:text-lg">Google</span>
				</button>
				<button
					onClick={signInWithGithub}
					className="flex items-center space-x-2 border-[0.2px] border-[#504f4f] rounded-xl px-6 md:px-14 py-2"
				>
					<Image
						src="/images/github_signup.png"
						width={18}
						height={18}
						alt="Google logo"
					/>
					<span className="font-semibold text-sm sm:text-lg">Github</span>
				</button>
			</div>
			{error && (
				<p className="mt-4 text-center text-red-500">
					Failed to Sign Up. Please try again.
				</p>
			)}
			<div className="flex items-center">
				<span className="w-full h-px my-8 bg-white border-0" />
				<span className="mx-2">or</span>
				<span className="w-full h-px my-8 bg-white border-0" />
			</div>
		</div>
	);
};

export default Introduction;
