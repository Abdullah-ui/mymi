import Image from "next/image";


const DashboardInfo = () => {
  return (
    <div className="bg-black bg-opacity-50 rounded-3xl px-20 max-md:px-5 py-28 space-y-12 mt-2 md:mt-[120px] max-lg:py-16 max-md:pt-5 max-md:mx-auto">
      <div className="flex justify-between max-xl:flex-col-reverse max-md:space-y-1">
        <div className="mt-10 max-lg:mt-8">
          <h3 className="text-4xl font-semibold mb-[20px] max-md:text-3xl">Custom Dashboard</h3>
          <p className="xl:w-[400px] max-xl:text-xl text-lg">
            Having an access to a custom dashboard that you can customised in
            accordance to your needs.
          </p>
        </div>
        <Image
          src="/images/dashboard_preview_home.png"
          alt="Dashboard Preview"
          className="max-xl:max-w-full max-xl:w-full"
          width={520}
          height={520}
        />
      </div>
      <div className="flex justify-between max-xl:flex-col max-xl:space-y-10 max-xl:pt-8">
        <Image
          src="/images/automated_feedback_home.png"
          alt="Automated Feedback Home"
          className="max-md:max-w-full max-md:w-full"
          width={540}
          height={520}
        />
        <div className="mt-4">
          <h3 className="text-4xl font-semibold mb-[20px] max-md:text-3xl">
            Personalized Feedback
          </h3>
          <p className="xl:w-[400px] max-xl:text-xl text-lg">
            Get personalized feedback tailored to your needs and actionable
            guidance to overcome your challenges. Address your weaknesses,
            refine your skills, and watch your progress turn into success
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardInfo;
