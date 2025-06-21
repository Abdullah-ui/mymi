import Link from "next/link";


const Info = () => {
	return (
		<div className="mt-[0px] ml-3">
			<div className="mb-20">
				<h1 className="text-[36px] md:text-[48px] mb-4">Contact Us</h1>
				<div className="flex flex-col gap-3">
					<p className="w-[400px]">Email, call, or complete the form to learn how Mymi can solve your messaging problem.</p>
					<Link href={"mailto:mymi@gmail.com"}><span className="underline">mymi@gmail.com</span></Link>
					<p>091-43992122</p>
					<div>
						<Link href={"/"} className="underline">
							Customer Support
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-10">
				<div className="w-[300px] space-y-2">
					<h3 className="font-semibold text-[22px]">Customer Support</h3>
					<p>Our support team is available around the clock to address any concerns or queries you may have.</p>
				</div>
				<div className="w-[300px] space-y-2">
					<h3 className="font-semibold text-[22px]">Feedback and Suggestions</h3>
					<p>
						We value your feedback and are continuously working to improve Mymi. Your input is crucial in shaping
						the future of mymi.
					</p>
				</div>
				<div className="w-[300px] space-y-2">
					<h3 className="font-semibold text-[22px]">Media Inquiries</h3>
					<p>For media-related questions or press inquiries, please contact us at mymi@gmail.com</p>
				</div>
			</div>
		</div>
	);
};

export default Info;
