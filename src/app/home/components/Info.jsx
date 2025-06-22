import Card from "./Card.jsx";
import homeCardData from "./homeCardData.json";

const Info = async () => {
  return (
    <div>
      <h3 className="text-6xl mb-[23px] max-md:text-[32px] max-md:mb-[10px]">
        <span className="text-[#F49CFC]">Everything </span>You Need
      </h3>
      <p className="text-[26px] max-md:text-[18px] mb-[65px]">
        All in one place – practice technical interviews with your friendly AI
        bot interviewer, secure your dream job, and elevate not only your
        technical skills but your overall professional potential!
      </p>
      <div className="mt-[65px] flex space-x-[22px] max-xl:flex-wrap max-xl:space-x-0 max-xl:space-y-[22px]">
        {homeCardData.map((card, key) => {
          return <Card key={key} heading={card.heading} text={card.text} />;
        })}
      </div>
    </div>
  );
};

export default Info;
