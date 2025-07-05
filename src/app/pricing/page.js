import Introduction from "./components/Introduction";
import Card from "./components/Card";
import pricingCardData from "./pricingCardData.json";
import { notFound } from 'next/navigation'

const page = async () => {
  notFound()
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
