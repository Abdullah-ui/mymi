"use client"
import { useState } from "react";
import axios from "axios";


const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault()

    if (firstName === "" || lastName === "" || email === "" || phoneNumber === "" || message === "") {
      setError(true);
      setErrorMessage("Please fill in all fields");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+?[0-9]{12}|[0-9]{11}$/;

    if (!phoneRegex.test(phoneNumber)) {
      setError(true);
      setErrorMessage("Please enter a valid phone number in the format +92XXXXXXXXXX or 92XXXXXXXXXX");
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setError(false);
    const fetchedData = await axios.post(
      "/api/contactSupport",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        message: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (fetchedData.data == "Failed") {
      setError(true)
      setErrorMessage("Message sending failed. Please try again");
    }
    if (fetchedData.data == "Done") {
      setError(false);
      setEmail("");
      setFirstName("");
      setlastName("");
      setPhoneNumber("");
      setMessage("");
      setSuccessMessage("Message sent successfully!");
    }
  };

  return (
    <div>
      <form action="" className="bg-black/25 backdrop-blur-md rounded-2xl px-8 py-12 shadow-lg max-w-lg w-full">
        <h2 className="text-4xl mb-2">Get in Touch</h2>
        <p className="mb-10 text-neutral-400">You can reach us anytime.</p>
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="First Name"
              className="bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 w-1/2 focus:outline-none"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 w-1/2 focus:outline-none ml-2"
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            pattern="\+?[0-9]{12}|[0-9]{11}"
            placeholder="92XXXXXXXXXX"
            className="w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 focus:outline-none"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <textarea
            placeholder="How can we help you?"
            className="resize-none w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 h-32 focus:outline-none"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-[#448871] rounded-3xl p-2" onClick={sendEmail}>Submit</button>
          {/* {error && <p className="text-center text-red-500">Message sending failed. Please try again</p>} */}
          {error && errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
          {!error && successMessage && <p className="text-center text-green-500">{successMessage}</p>}
          <p className="text-center">By contacting us, you agree to our Terms of service and Privacy Policy</p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
