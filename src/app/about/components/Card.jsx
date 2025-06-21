const Card = ({ meta, heading, text, headingSize = "44px" }) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex flex-col bg-black bg-opacity-50 rounded-3xl px-8 py-9">
        <h4 className="text-[#EB7830] mb-[26px]">{meta}</h4>
        <h3 className="mb-[30px] text-xl lg:text-2xl md:text-xl xl:text-3xl font-bold">
          {heading}
        </h3>
        <p className="md:text-[14px] xl:text-[18px]">{text}</p>
      </div>
    </div>
  );
};

export default Card;
