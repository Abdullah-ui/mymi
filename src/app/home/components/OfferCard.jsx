import Image from "next/image";

const OfferCard = ({ image, title }) => {
  return (
    <div className="bg-black bg-opacity-50 p-8 rounded-3xl space-y-5 max-sm:flex max-sm:items-center max-sm:space-y-0 max-sm:space-x-5">
      <Image src={`${image}`} alt="Book Offer" width={45} height={45} />
      <p className="text-xl">{title}</p>
    </div>
  );
};

export default OfferCard;
