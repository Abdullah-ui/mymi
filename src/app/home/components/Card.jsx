const Card = ({ heading, text }) => {
  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md rounded-3xl shadow-lg md:w-fit w-full flex justify-center px-8 py-12">
      <div className="max-w-[580px] space-y-[21px]">
        <h4 className="text-[26px] font-semibold">{heading}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card;
