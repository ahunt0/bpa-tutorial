import React from "react";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

export default function AdminBase({ children }) {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col w-full">
				<Nav />
				<div className="flex-grow p-4">
					<div className="bg-white h-full w-full rounded-md">
						<div className="p-10 relative">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
