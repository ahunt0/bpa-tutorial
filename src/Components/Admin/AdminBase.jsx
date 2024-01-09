import React, { useEffect, useState } from "react";
import Nav from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

const pageTitleMap = {
	"/admin/user/": "Edit User",
	"/admin/users": "users",
	"/admin": "dashboard",
	"/admin/courses": "courses",
	"/admin/course/": "Edit Course",
};

export default function AdminBase({ children, className }) {
	const location = useLocation();
	const currentPage = location.pathname.replace(/\/$/, ""); // Remove trailing slash
	const pageTitle = pageTitleMap[currentPage] || "Default Title";
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		checkAuthentication();
	}, []);

	const checkAuthentication = async () => {
		try {
			const response = await fetch("http://localhost:3001/api/v1/auth/isAuthenticated", {
				credentials: "include",
			});
			const data = await response.json();

			// Check if the user is authenticated and an admin, otherwise redirect to login (TEMPORARY)
			if (response.ok && data.access === "admin") {
				setIsAuthenticated(true);
			} else {
				setIsAuthenticated(false);
				navigate("/login");
			}
		} catch (error) {
			console.error("Error checking authentication:", error);
			setIsAuthenticated(false);
		}
	};

	return (
		<div className={`flex dark text-default-700 bg-background ${className}`}>
			<Sidebar currentPage={pageTitle} />
			<div className="flex flex-col w-full">
				<Nav />
				<div className="flex-grow">
					{isAuthenticated ? (
						<div className="bg-default-100 h-full w-full">
							<div className="p-10 relative min-h-full">{children}</div>
						</div>
					) : (
						<div className="flex items-center justify-center h-full bg-default-50/50">
							<Spinner size="lg" label="Loading, please wait" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
