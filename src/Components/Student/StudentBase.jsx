import React from "react";

export default function StudentBase({ children }) {
	return (
		<div className="dark min-h-screen bg-default-100 text-default-800 flex justify-center items-start py-20">
			<div className="bg-default-50 p-10 h-full w-[1200px] rounded-lg">{children}</div>
		</div>
	);
}
