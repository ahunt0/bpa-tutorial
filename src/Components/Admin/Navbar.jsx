import React from "react";
import { UserIcon, InboxIcon } from "../Common/Icons";
import { Divider, Badge } from "@nextui-org/react";
import { useLocation } from "react-router-dom";

const pageTitleMap = {
	"/admin/users": "Users",
	"/admin": "Dashboard",
};

export default function AdminBase({ children, className }) {
	const location = useLocation();
	const currentPage = location.pathname.replace(/\/$/, ""); // Remove trailing slash
	let pageTitle = "Default Title";

	// Regex pattern to match '/admin/user/' followed by a number
	const userEditPattern = /^\/admin\/user\/\d+$/;

	if (userEditPattern.test(currentPage)) {
		pageTitle = "Edit User";
	} else {
		pageTitle = pageTitleMap[currentPage] || "Default Title";
	}

	return (
		<nav className="dark flex justify-between items-center w-full bg-default-50 p-4">
			<div className="flex flex-col text-white">
				<span className="font-semibold text-xl tracking-wide">{pageTitle}</span>
				<p className="text-gray-400 text-sm">Welcome back USER</p>
			</div>
			<div className="flex items-center text-white text-sm">
				<div className="flex items-center mr-6">
					<Badge color="primary" variant="shadow" content="5" showOutline="false">
						<InboxIcon className="w-6 text-default-800" />
					</Badge>
					<Divider className="h-10 mx-6" orientation="vertical" />
					<UserIcon className="w-8 mr-2 text-default-400" />
					<div>
						<p className="text-md">Username</p>
						<p className="text-gray-400">Role</p>
					</div>
				</div>
			</div>
		</nav>
	);
}
