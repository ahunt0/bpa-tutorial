import React from "react";
import { Link } from "react-router-dom";

export default function SidebarButton({ className, children, to, selected = false }) {
	return (
		<Link
			to={to}
			className={`w-11/12 p-2 rounded-lg flex hover:bg-primary-400 ease-in-out duration-200 ${className} ${
				selected ? "font-semibold text-default-900 bg-primary-400/80" : "font-medium text-default-500 hover:text-default-900"
			}`}
		>
			{children}
		</Link>
	);
}
