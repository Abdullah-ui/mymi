import ContactForm from "./components/ContactForm";
import Info from "./components/Info";

const page = () => {
	return (
		<section className="flex max-lg:flex-col mt-[95px] justify-between max-lg:items-center max-lg:gap-24">
			<Info />
			<ContactForm/>
		</section>
	);
};

export default page;
