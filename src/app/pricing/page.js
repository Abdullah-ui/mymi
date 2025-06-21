
import Introduction from "./components/Introduction";
import Card from "./components/Card";

const page = async () => {
  const pricingCardRes = await fetch(
    `${process.env.BASE_URL}/data/pricingCardData.json`
  );
  const pricingCardData = await pricingCardRes.json();
  return (
    <section>
      <Introduction />
      <div className="flex justify-center">
        <div className="flex max-md:flex-col md:flex-wrap md:justify-center gap-10">
          {pricingCardData.map((card, key) => {
            return (
              <Card
                key={key}
                plan={card.plan}
                price={card.price}
                offers={card.offers}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default page;
