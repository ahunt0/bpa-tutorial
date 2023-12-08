import React from "react";
import { Button } from "@nextui-org/react";

export default function SidebarButton({ className, children, href, selected = false }) {
	const handleClick = () => {
		window.location.href = href;
	};

	return (
		<Button
			color="primary"
			variant={selected ? "flat" : "light"}
			className={`w-11/12 ${className} ${selected ? "font-semibold text-default-900" : "font-medium text-default-500 hover:text-default-900"}`}
			style={{ justifyContent: "flex-start" }}
			onClick={handleClick}
			disableRipple={true}
		>
			{children}
		</Button>
	);
}
