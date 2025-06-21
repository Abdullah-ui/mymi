"use client";

import React, { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const Dropdowns = () => {
	const [faqDropDownData, setFaqDropDownData] = useState([]);
	const [openIndex, setOpenIndex] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const faqDropDownRes = await fetch(`/data/faqDropDownData.json`);
			const data = await faqDropDownRes.json();
			setFaqDropDownData(data);
		};
		fetchData();
	}, []); 

	const toggleDropdown = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<div className="space-y-4">
				{faqDropDownData.map((faq, index) => (
					<div key={index}>
						<button
							onClick={() => toggleDropdown(index)}
							className="w-full text-left px-4 py-2 flex justify-between items-center focus:outline-none">
							<span className="font-medium">{faq.question}</span>
							<BsChevronDown
								className={`transition-transform duration-300 ease-in-out ${openIndex === index ? "rotate-180" : ""}`}
							/>
						</button>
						<div
							className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
								openIndex === index ? "max-h-screen" : "max-h-0"
							}`}>
							<p className="px-4 py-2 text-neutral-300">{faq.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dropdowns;
