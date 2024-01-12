import React from "react";
import { Link } from "react-router-dom";

export default function SidebarButton({ className, children, to, selected = false }) {
	return (
		<Link
			to={to}
			className={`w-11/12 p-4 rounded-e-lg flex items-center hover:bg-[#fbf7ef] border-[#ffd377] ease-in-out duration-200 ${className} ${
				selected ? "font-semibold bg-[#fbf7ef] text-default-50 border-l-5" : "font-medium text-[#fbf7ef] hover:text-default-50 hover:border-l-5"
			}`}
		>
			{children}
		</Link>
	);
}
