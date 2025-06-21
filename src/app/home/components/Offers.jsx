import OfferCard from "./OfferCard";

const Offers = async () => {
  const homeOfferRes = await fetch(
    `${process.env.BASE_URL}/data/homeOfferData.json`
  );
  const homeOfferData = await homeOfferRes.json();

  return (
    <div className="mt-[115px]">
      <div className="mb-[60px]">
        <h3 className="text-3xl font-semibold">Additionally We Offer</h3>
        <p>These are some of the features that come as a bonus with Mymi.</p>
      </div>
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {homeOfferData.map((card, key) => {
          return (
            <OfferCard
              key={key}
              image={card.image}
              title={card.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Offers;
