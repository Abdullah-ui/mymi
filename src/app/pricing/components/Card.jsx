import Link from "next/link";

const Card = ({ plan, price, offers }) => {
  return (
    <div className="border border-black bg-black bg-opacity-50 rounded-3xl flex flex-col justify-between space-y-14 p-5 md:p-6 lg:p-10">
      <div className="space-y-8">
        <h3 className="text-4xl font-semibold text-center lg:text-left">{plan}</h3>
        <div className="flex gap-2 justify-center">
          <h5 className="text-xl text-neutral-400 font-bold">PKR</h5>
          <p className="text-3xl">{price}</p>
        </div>
        <Link href="/payment">
          <button className="bg-[#2F653E] text-center w-full rounded-full py-[5px] mt-5">
            Get Started
          </button>
        </Link>
      </div>
      <div>
        {offers.map((offer, key) => {
          return (
            <div key={key} className="mb-2">
              <p className="mb-2 w-[240px]">{offer.title}</p>
              {key !== offers.length - 1 && (
                <hr className="border-t-1 border-gray-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
