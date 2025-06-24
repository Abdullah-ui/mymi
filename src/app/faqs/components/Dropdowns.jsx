"use client";

import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import faqDropDownData from "./faqDropDownData.json"

const Dropdowns = () => {
	const [openIndex, setOpenIndex] = useState(null);

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
							className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openIndex === index ? "max-h-screen" : "max-h-0"
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
