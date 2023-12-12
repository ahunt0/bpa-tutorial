import React from "react";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";

const pageTitleMap = {
	"/admin/users": "users",
	"/admin": "dashboard",
};

export default function AdminBase({ children, className }) {
	const location = useLocation();
	const currentPage = location.pathname.replace(/\/$/, ""); // Remove trailing slash
	const pageTitle = pageTitleMap[currentPage] || "Default Title";

	return (
		<div className={`flex ${className}`}>
			<Sidebar currentPage={pageTitle} />
			<div className="flex flex-col w-full">
				<Nav />
				<div className="flex-grow p-4">
					<div className="bg-white h-full w-full rounded-md">
						<div className="p-10 relative min-h-full">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
