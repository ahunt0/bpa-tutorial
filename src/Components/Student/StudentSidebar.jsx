import React from "react";
import { ReactComponent as Logo } from "../../Assets/Images/Logo.svg";

export default function StudentSidebar({ className }) {
	return (
		<div className={`dark h-screen w-1/6 bg-default-50 flex flex-col ${className} left-0 top-0`}>
			<Logo className="fill-white h-12 mt-4" />
		</div>
	);
}
