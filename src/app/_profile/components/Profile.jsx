import Image from "next/image";


const Profile = () => {
  return (
    <div className="flex space-x-10 mt-[95px]">
      <Image
        src="/images/person_dashboard.png"
        alt="Profile Picture"
        className="rounded-3xl"
        width={400}
        height={400}
      />
      <div className="bg-[#0B101C] p-10 rounded-3xl">
        <h2 className="text-[#9D9EA1] text-xl mb-6">Zeeshan Ahmad</h2>
        <p className="text-4xl font-semibold mb-3">Howdy!</p>
        <p>
          I’m Zeeshan Ahmad, a 25-year-old student at the University of
          Engineering and Technology, Peshawar, currently in my final year of
          Software Engineering. I’m passionate about web design and development
          and spend most of my time experimenting with front-end frameworks and
          building small projects to improve my skills. I love collaborating
          with other students on creative ideas, and I dream of one day
          launching a platform that helps developers learn and grow together.
          When I’m not studying or coding, I enjoy exploring the vibrant tech
          community in Peshawar and staying updated on the latest trends in web
          development.
        </p>
      </div>
    </div>
  );
};

export default Profile;
