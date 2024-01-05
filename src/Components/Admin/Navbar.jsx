import React, { useEffect, useState } from "react";
import { UserIcon, InboxIcon } from "../Common/Icons";
import { Divider, Badge, user } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const pageTitleMap = {
	"/admin/users": "Users",
	"/admin": "Dashboard",
	"/admin/courses": "Courses",
	"/admin/assignments": "Assignments",
};

export default function AdminBase({ children, className }) {
	const location = useLocation();
	const currentPage = location.pathname.replace(/\/$/, ""); // Remove trailing slash
	let pageTitle = "Default Title";
	const [currentUser, setCurrentUser] = useState(null);
	const [currentAccess, setCurrentAccess] = useState(null);

	// Regex pattern to match '/admin/user/' followed by a number
	const userEditPattern = /^\/admin\/user\/\d+$/;
	const courseEditPattern = /^\/admin\/course\/\d+$/;
	const assignmentEditPattern = /^\/admin\/assignments\/\d+$/;

	if (userEditPattern.test(currentPage)) {
		pageTitle = "Edit User";
	} else if (courseEditPattern.test(currentPage)) {
		pageTitle = "Edit Course";
	} else if (assignmentEditPattern.test(currentPage)) {
		pageTitle = "Assignments";
	} else {
		pageTitle = pageTitleMap[currentPage] || "Default Title";
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/api/v1/current-user`, { withCredentials: true });
				setCurrentUser(response.data.user.firstName);
				setCurrentAccess(response.data.user.access);
			} catch (error) {
				console.log("Error fetching current user:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<nav className="dark flex justify-between items-center w-full bg-default-50 p-4">
			<div className="flex flex-col text-white">
				<span className="font-semibold text-xl tracking-wide">{pageTitle}</span>
				<p className="text-gray-400 text-sm">
					Welcome back <span className="capitalize italic">{currentUser}</span>
				</p>
			</div>
			<div className="flex items-center text-white text-sm">
				<div className="flex items-center mr-6">
					<Badge color="primary" variant="shadow" content="5" showOutline="false">
						<InboxIcon className="w-6 text-default-800" />
					</Badge>
					<Divider className="h-10 mx-6" orientation="vertical" />
					<UserIcon className="w-8 mr-2 text-default-400" />
					<div>
						<p className="text-md capitalize">{currentUser}</p>
						<p className="text-gray-400 capitalize">{currentAccess}</p>
					</div>
				</div>
			</div>
		</nav>
	);
}
