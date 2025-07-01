import Image from "next/image";

const AdditionalInfo = () => {
  return (
    <div className="lg:mt-[115px] mt-[42px] flex max-lg:flex-col space-x-10 max-lg:space-x-0 max-lg:space-y-10">
      <div className="bg-black bg-opacity-50 rounded-3xl xl:p-20 lg:p-14 p-12">
        <h3 className="xl:text-3xl lg:text-2xl text-3xl font-semibold mb-10">
          The Ultimate AI Interviewer
        </h3>
        <div className="space-y-4 xl:text-xl lg:text-lg text-xl">
          <p>
            Mymi is designed to elevate your interview preparation by leveraging
            real-world industry insights and best practices. Trained on a
            diverse dataset of technical interviews, Mymi ensures you’re
            equipped with the skills and confidence needed to land your dream
            job.
          </p>
          <p>
            Looking for personalized feedback? Mymi’s got you covered! Curious
            about the latest industry-standard practices? We’re here to guide
            you.
          </p>
          <p>
            With everything you need just a few clicks away, achieving your
            career goals has never been easier. Sign up today and take the first
            step toward acing your interviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
