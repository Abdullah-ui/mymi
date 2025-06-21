import Introduction from "./components/Introduction";
import Card from "./components/Card";
import Stats from "./components/Stats";
import Image from "next/image";

const page = async () => {
  const aboutCardRes = await fetch(
    `${process.env.BASE_URL}/data/aboutCardData.json`
  );
  const aboutCardData = await aboutCardRes.json();
  const aboutStatsRes = await fetch(
    `${process.env.BASE_URL}/data/aboutStatsData.json`
  );
  const aboutStatsData = await aboutStatsRes.json();

  return (
    <section>
      <Introduction />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <Card
          meta={aboutCardData[0].meta}
          headingSize="40px"
          heading={aboutCardData[0].heading}
          text={aboutCardData[0].text}
          spacespace
        />
        <div className="flex flex-col justify-between gap-10 md:gap-4">
          <Image
            src="/images/stock_photo_about.png"
            className="rounded-3xl"
            alt="Company Logo"
            width={1440}
            height={1440}
          />
          <div className="bg-[#000000] bg-opacity-50 grid grid-cols-2 gap-6 rounded-3xl p-7">
            {aboutStatsData.map((stat, key) => {
              return <Stats key={key} number={stat.number} text={stat.text} />;
            })}
          </div>
        </div>
        <Card
          meta={aboutCardData[1].meta}
          heading={aboutCardData[1].heading}
          text={aboutCardData[1].text}
        />
        <Card
          meta={aboutCardData[2].meta}
          heading={aboutCardData[2].heading}
          text={aboutCardData[2].text}
        />
      </div>
    </section>
  );
};

export default page;
