import React from "react";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import { useLocation } from "react-router-dom";

const pageTitleMap = {
	"/admin/user/": "Edit User",
	"/admin/users": "users",
	"/admin": "dashboard",
};

export default function AdminBase({ children, className }) {
	const location = useLocation();
	const currentPage = location.pathname.replace(/\/$/, ""); // Remove trailing slash
	const pageTitle = pageTitleMap[currentPage] || "Default Title";

	return (
		<div className={`flex dark text-default-700 bg-background ${className}`}>
			<Sidebar currentPage={pageTitle} />
			<div className="flex flex-col w-full">
				<Nav />
				<div className="flex-grow">
					<div className="bg-default-100 h-full w-full">
						<div className="p-10 relative min-h-full">{children}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
