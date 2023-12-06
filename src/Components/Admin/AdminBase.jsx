import React from "react";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";

export default function AdminBase() {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex flex-col w-full">
				<Nav />
				<div className="flex-grow p-4">
					<Dashboard />
				</div>
			</div>
		</div>
	);
}
