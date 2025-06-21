const Banner = () => {
  return (
    <div className="mt-[115px] bg-[#B692C4] rounded-tr-3xl rounded-br-3xl rounded-bl-[85px] rounded-tl-[85px] flex max-md:flex-col">
      <div className="bg-[#130C13] rounded-br-[85px] rounded-tl-3xl md:rounded-bl-3xl w-full md:w-1/2">
        <h3 className="text-3xl md:text-4xl font-semibold px-8 md:px-16 py-12 md:py-28">
          Transforming preparation into success, one interview at a time, with
          personalized guidance
        </h3>
      </div>
      <div className="text-[#130C13] px-8 md:px-16 py-6 pb-10 md:py-28 w-full md:w-1/2">
        <h3 className="text-3xl md:text-4xl font-semibold mb-2 md:mb-10">5 Free Interviews</h3>
        <p className="text-[19px] md:text-xl">
          Unlock your potential with 5 FREE mock interviews on MyMI! Experience
          real-world interview scenarios, sharpen your skills, and boost your
          confidence—on us!
        </p>
      </div>
    </div>
  );
};

export default Banner;
