import React from "react";
import StudentSidebar from "./Sidebar/StudentSidebar";

export default function StudentBase({ children }) {
	return (
		<>
			<style>{`
				body {
					background-color: #fbf7ef;
				}
			`}</style>
			<div className="flex">
				<StudentSidebar />
				<div className="p-10">{children}</div>
			</div>

			{/* <div className="min-h-screen text-default-800 flex justify-center items-start py-20"><div className="bg-white p-10 h-full w-[1200px] rounded-lg border-2">{children}</div></div> */}
		</>
	);
}
