

const ContactForm = () => {
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
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 w-1/2 focus:outline-none ml-2"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 focus:outline-none"
          />
          <input
            type="tel"
            pattern="/\+?[0-9]{12}|[0-9]{11}/gm"
            placeholder="92XXXXXXXXXX"
            className="w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 focus:outline-none"
          />
          <textarea
            placeholder="How can we help you?"
            className="resize-none w-full bg-transparent placeholder:text-[#7187A2] border border-[#7187A2] rounded-xl py-2 px-3 h-32 focus:outline-none"
          />
          <button className="bg-[#448871] rounded-3xl p-2">Submit</button>
          <p className="text-center">By contacting us, you agree to our Terms of service and Privacy Policy</p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
